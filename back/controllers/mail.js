const nodemailer = require('nodemailer');
const { pugEngine } = require("nodemailer-pug-engine");
const ics = require('ics');

const config = require('../config');

const User = require('../models/user');
const Doctor = require('../models/doctor');

const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];


let transporter = nodemailer.createTransport({
  host: config.emailServer,
  port: config.emailPort,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.email, // generated ethereal user
    pass: config.emailPassword // generated ethereal password
  }
});
transporter.use('compile', pugEngine({
  templateDir: __dirname + '/../views',
}));

exports.adminForgetPassword = (email, token, url) => {
  transporter.sendMail({
    from: `"MediLibre, Renouvellemnt de votre mot de passe" <${config.email}>`, // sender address
    to: email, // list of receivers
    subject: "Récupération de votre compte", // Subject line
    text: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante ${url}/renew/${token}`, // plain text body
    template: 'mail',
    ctx: {
      welcome: `Bonjour,`,
      title: "Récupération de votre compte",
      confirm: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante `,
      link: `${url}/renew/${token}`,
      footer: 'attention le lien n\'est valable que durant 1H, passé ce délai il aura expiré',
      bye: 'A bienôt',
    },
  })
    .then(() => console.log('mail bien envoyé'))
    .catch((error) => console.warn(error));
}

exports.userForgetPassword = (email, token, url) => {
  transporter.sendMail({
    from: `"MediLibre, Renouvellemnt de votre mot de passe" <${config.email}>`, // sender address
    to: email, // list of receivers
    subject: "Récupération de votre compte", // Subject line
    text: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante ${url}/renew/${token}`, // plain text body
    template: 'mail',
    ctx: {
      welcome: `Bonjour,`,
      title: "Récupération de votre compte",
      confirm: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante `,
      link: `${url}/renew/${token}`,
      footer: 'attention le lien n\'est valable que durant 1H, passé ce délai il aura expiré',
      bye: 'A bienôt',
    },
  })
    .then(() => console.log('mail bien envoyé'))
    .catch((error) => console.warn(error));
}

// eslint-disable-next-line no-unused-vars
exports.appointmentConfirmMail = (appointment, userId) =>  {
  Doctor.findOne({ _id: appointment.doctorId})
    .then((doctor) => {
      User.findOne({ _id: userId })
        .then((user) => {
          if (user && ((user.email !== null) || (user.publicEmail !== null))) {
            let email;
            if (user.email) {
              email = user.email;
            }
            else {
              email = user.publicEmail;
            }
            let custom = '';
            if (doctor.customMailText) {
              custom = doctor.customMailText;
            }
            console.log(custom);
            const appointmentDate = new Date(appointment.startTime + 7200000);
            const duration = new Date(appointment.endTime - appointment.startTime);
            console.log(duration.getHours(), duration.getMinutes());
            const day = `${days[appointmentDate.getDay()]} ${appointmentDate.getDate()} ${months[appointmentDate.getMonth()]}`
            const hour = `${(`0${appointmentDate.getHours()}`).substr(-2)}:${(`0${appointmentDate.getMinutes()}`).substr(-2)}`;
            // création de l'event ICS
            const event = {
              title: `rendez-vous avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`,
              start: [appointmentDate.getFullYear(), appointmentDate.getMonth() + 1, appointmentDate.getDate(), appointmentDate.getHours() - 2, appointmentDate.getMinutes()],
              duration: { hours: duration.getHours() -1, minutes: duration.getMinutes() },
              description: `rendez-vous avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`,
              location: `${doctor.adress} ${doctor.zip} ${doctor.city}`,
            };
            const icsEvent = ics.createEvent(event, (error, value) => {
              if (error) {
                console.log(error);
                return;
              }
              return value;
            });
            transporter.sendMail({
              from: `"MediLibre, votre rendez-vous" <${config.email}>`, // sender address
              to: email, // list of receivers
              subject: `Confirmation de votre rendez-vous avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`, // Subject line
              text: `Confirmation de votre rendez-vous du ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`, // plain text body
              icalEvent: {
                filename: 'rendez-vous.ics',
                content: icsEvent,
              },
              template: 'mail',
              ctx: {
                welcome: `Bonjour ${user.firstname} ${user.lastname}`,
                title: `Confirmation de votre rendez-vous du ${day}`,
                confirm: `Nous avons bien enregistré votre rendez-vous le ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`,
                custom,
                footer: `Cliquez sur la piece jointe pour ajouter à votre agenda, Pour consulter ou annuler vos rendez-vous connectez-vous sur l'historique de votre compte à l'adresse suivante:`,
                link: `https://medi-libre.fr/${doctor.slug}`,
                bye: `à bientôt`
              },
            })
              .then(() => console.log('mail bien envoyé'));
          }
        });
  });
}

// eslint-disable-next-line no-unused-vars
exports.appointmentConfirmMailDoctor = (appointment, doctorId) =>  {
  User.findOne({ _id: appointment.userId})
    .then((user) => {
      Doctor.findOne({ _id: doctorId })
        .then((doctor) => {
          let custom = '';
            if (doctor.customTextMail) {
              custom = doctor.customTextMail;
            }
          console.log(doctor);
          if (doctor && (doctor.email !== null)) {
            const appointmentDate = new Date(appointment.startTime + 7200000);
            const day = `${days[appointmentDate.getDay()]} ${appointmentDate.getDate()} ${months[appointmentDate.getMonth()]}`
            const hour = `${(`0${appointmentDate.getHours()}`).substr(-2)}:${(`0${appointmentDate.getMinutes()}`).substr(-2)}`;
            transporter.sendMail({
              from: `"MediLibre, Nouveau rendez-vous" <${config.email}>`, // sender address
              to: doctor.email, // list of receivers
              subject: `Nouveau rendez-vous avec ${user.firstname} ${user.lastname}`, // Subject line
              text: `${user.firstname} ${user.lastname} vient de prendre un rendez-vous le ${day} à ${hour} avec vous`, // plain text body
              template: 'mail',
              ctx: {
                welcome: `Bonjour ${doctor.firstname} ${doctor.lastname}`,
                title: `Nouveau rendez-vous le ${day}`,
                confirm: `${user.firstname} ${user.lastname} vient de prendre un rendez-vous le ${day} à ${hour} avec vous`,
                custom,
                footer: `Pour consulter ou annuler vos rendez-vous connectez-vous sur :`,
                link: `https://medi-libre.fr/admin/planning`,
                bye: `à bientôt`
              },
            })
              .then(() => console.log('mail bien envoyé (doctor)'));
          }
        })
      
    })
}

// eslint-disable-next-line no-unused-vars
exports.appointmentCancelMail = (appointment, userId) =>  {
  Doctor.findOne({ _id: appointment.doctorId})
    .then((doctor) => {
      User.findOne({ _id: userId })
        .then((user) => {
          if (user && ((user.email !== null) || (user.publicEmail !== null))) {
            let email;
            if (user.email) {
              email = user.email;
            }
            else {
              email = user.publicEmail;
            }
            const appointmentDate = new Date(appointment.startTime + 7200000);
            const day = `${days[appointmentDate.getDay()]} ${appointmentDate.getDate()} ${months[appointmentDate.getMonth()]}`
            const hour = `${(`0${appointmentDate.getHours()}`).substr(-2)}:${(`0${appointmentDate.getMinutes()}`).substr(-2)}`;
            transporter.sendMail({
              from: `"MediLibre, annulation de votre rendez-vous" <${config.email}>`, // sender address
              to: email, // list of receivers
              subject: `Annulation de votre rendez-vous ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname}`, // Subject line
              text: `Nous vous confirmons l'annulation de votre rendez-vous du ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`, // plain text body
              template: 'mail',
              ctx: {
                welcome: `Bonjour ${user.firstname} ${user.lastname}`,
                title: `Annulation de votre rendez-vous ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname}`,
                confirm: `Nous vous confirmons l'annulation de votre rendez-vous du ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`,
                footer: `Pour consulter ou annuler vos rendez-vous connectez-vous sur l'historique de votre compte à l'adresse suivante:`,
                link: `https://medi-libre.fr/${doctor.slug}`,
                bye: `à bientôt`
              },
            })
              .then(() => console.log('mail bien envoyé'));
          }
        });
    });
}

// eslint-disable-next-line no-unused-vars
exports.newUserConfirmMail = ( userId) =>  {
  User.findOne({ _id: userId })
    .then((user) => {
      transporter.sendMail({
        from: `"Medilibre, Création de votre compte" <${config.email}>`, // sender address
        to: user.email, // list of receivers
        subject: "Création de votre compte", // Subject line
        text: `Nous avons le plaisir de vous confirmer la creation de votre compte patient au nom de ${user.firstname} ${user.lastname}`, // plain text body
        template: 'mail',
        ctx: {
          welcome: `Bonjour ${user.firstname} ${user.lastname}`,
          title: `Création de votre compte patient`,
          confirm: `Nous avons le plaisir de vous confirmer la creation de votre compte patient au nom de ${user.firstname} ${user.lastname}`,
          footer: `Vous pouvez desormais prendre rendez-vous avec votre praticien sur `,
          link: `https://medi-libre.fr`,
          bye: `à bientôt sur mediLibre`
        },
      })
        .then(() => console.log('mail bien envoyé'));
    })
}

// eslint-disable-next-line no-unused-vars
exports.modifyUserDatasMail = ( userId) =>  {
  User.findOne({ _id: userId })
    .then((user) => {
      if (user && user.email !== null) {
        transporter.sendMail({
          from: `"MediLibre" <${config.email}>`, // sender address
          to: user.email, // list of receivers
          subject: "Modification des informations de votre compte", // Subject line
          text: `Vos données ont été modifiés`, // plain text body
          template: 'mail',
          ctx: {
            welcome: `Bonjour ${user.firstname} ${user.lastname}`,
            title: `Modification de vos données`,
            confirm: `Des données vous concernant ont été modifiée dans votre compte MédiLibre`,
            bye: `à bientôt sur mediLibre`
          },
        })
          .then(() => console.log('mail bien envoyé'));
      }
    })
}

exports.confirmValidDoctorEmail = (newDoctor) => {
  transporter.sendMail({
    from: `"MediLibre" <${config.email}>`, // sender address
    to: newDoctor.email, // list of receivers
    subject: "Création de votre compte", // Subject line
    text: `Pour créer votre compte `, // plain text body
    template: 'mail',
    ctx: {
      welcome: `Bonjour ${newDoctor.firstname} ${newDoctor.lastname}`,
      title: `Création de votre compte`,
      confirm: `Votre compte est presque créé, il vous reste juste à confirmer votre adresse email en suivant le lien ci dessous :`,
      link: `https://medi-libre.fr/new/${newDoctor._id}`,
      bye: `à tout de suite sur mediLibre`
    },
  })
    .then(() => {
        console.log(`mail bien envoyé à ${newDoctor.email}`);
      });

}

exports.newDoctorAccount = ( doctorId) =>  {
  Doctor.findOne({ _id: doctorId })
    .then((doctor) => {
      transporter.sendMail({
        from: `"Medilibre, Création de votre compte" <${config.email}>`, // sender address
        to: doctor.email, // list of receivers
        subject: "Création de votre compte", // Subject line
        text: `Nous avons le plaisir de vous confirmer la creation de votre compte praticien au nom de ${doctor.firstname} ${doctor.lastname}`, // plain text body
        template: 'mail',
        ctx: {
          welcome: `Bonjour ${doctor.firstname} ${doctor.lastname}`,
          title: `Création de votre compte praticien`,
          confirm: `Nous avons le plaisir de vous confirmer la creation de votre compte praticien au nom de ${doctor.firstname} ${doctor.lastname}`,
          text1: `Vous pouvez desormais vous connecter à l'adresse suivante `,
          link1: `https://medi-libre.fr/admin`,
          footer: 'vous beneficiez également de votre page personnelle à l\'adresse suivante',
          link: `https://medi-libre.fr/${doctor.slug}`,
          bye: `à bientôt sur mediLibre`
        },
      })
        .then(() => console.log(`mail bien envoyé à ${doctor.email}`));
    })
}

exports.sendNewsletter = (subject, content, adminDoctor, doctors) => {
  const newContent = content.split('\n');
  doctors.forEach((doctor) => {
    transporter.sendMail({
      from: `"${adminDoctor.firstname} de Medilibre" <${adminDoctor.email}>`, // sender address
      to: doctor.email, // list of receivers
      subject: subject, // Subject line
      text: content, // plain text body
      template: 'newsletter',
      ctx: {
        welcome: `Bonjour ${doctor.firstname} ${doctor.lastname}`,
        title: subject,
        content: newContent,
        bye: `à bientôt sur mediLibre`,
        link3: 'https://medi-libre.fr/admin',
      },
    })
      .then(() => {
        console.log(`mail bien envoyé à ${doctor.email}`);  
      })
      .catch((error) => {
        console.log(error);
        console.log(`echec de l'envoi du message à ${doctor.email}`);
      });
  });
}