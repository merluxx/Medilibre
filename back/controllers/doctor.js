/* eslint-disable no-unused-vars */

const Doctor = require('../models/doctor');
const AdminForget = require('../models/adminForget');
const PendingDoctor = require('../models/pendingDoctor');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mail = require('../controllers/mail');
const fileupload = require('express-fileupload');


exports.renewPassword = (req, res, next) => {
  AdminForget.findOne({
    token: req.body.renewToken,
  })
  .then((forget) => {
    const now = Date.now();
    if (now > forget.expirationDate) {
      res.status(400).json({ error: 'erreur'});
    }
    else {
      Doctor.findOne({
        email: forget.email,
      })
        .then((doctor) => {
          if (doctor === null) {
            res.status(400).json({ error: 'erreur'});
          }
          bcrypt.hash(req.body.password, 10)
            .then((hash) => {
              Doctor.updateOne({
                email: forget.email
              },
              {
                password: hash,
              })
              .then(() => {
                forget.delete();
                res.status(200).json({ error: 'erreur'});
              })
              .catch(() => {
                res.status(400).json({ error: 'erreur'});
              });
            }).catch(() => {
              res.status(400).json({ error: 'erreur'});
            });
        }).catch(() => {
          res.status(400).json({ error: 'erreur'});
        });
    }
  })
  .catch((error) => {
    res.status(400).json({ 
      error: 'erreur',
      message: error,
    });
  })
}

exports.forgotPassword = (req, res, next) => {
  Doctor.findOne({
    email: req.body.email,
  })
    .then((doctor) => {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const expirationDate = Date.now() + 3600000;
      const forget = new AdminForget({
        email: req.body.email,
        token,
        expirationDate,
      });
      forget.save()
        .then(() => {
          mail.adminForgetPassword(req.body.email, token, req.body.url);
        });
      res.status(201).json({
        message: 'ok',
      });
    })
    .catch(() => {
      res.status(201).json({
        message: 'ok',
      });
    });
}

exports.uploadAvatar = (req, res, next) => {
  fileupload();
  const avatar = req.files.file;
  const path =  `${__dirname}/../avatar/${req.doctorId}.jpeg` ;
  avatar.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    Doctor.updateOne({_id: req.doctorId} , { avatar: `/avatar/${req.doctorId}.jpeg` })
      .then((doctor) => {
        res.end(JSON.stringify({ status: 'success', path: `/avatar/${req.doctorId}.jpeg` }))
      })
  })



}

// method to check if user is logged
exports.checkIsLogged = (req, res, next) => {
  Doctor.findOne({
    _id: req.doctorId,
  },
  {
    password: 0,
  }).then((doctor) => {
    if (!doctor) {
      res.status(401).json({
        error: 'utilisteur non trouvé !',
      });
    }
    else {
      res.status(200).json({
        doctor, 
      });
    }
  })
  .catch(() => {
    res.status(401).json({
      error: 'utilisateur non connecté',
    });
  });
}

//method to login
exports.login = (req, res, next) => {
  Doctor.findOne({ email: req.body.email.trim().toLowerCase() })
  .then((doctor) => {
    if (!doctor) {
      return res.status(401).json({
        error: 'utilisateur non trouvé',
      });
    }
    bcrypt.compare(req.body.password, doctor.password)
    .then((valid) => {
      if (!valid) {
        return res.status(401).json({
          error: 'mot de passe incorrect',
        });
      }
      console.log(`Connexion de ${doctor.firstname} ${doctor.lastname}`);
      res.status(200).json({
            doctorId: doctor._id,
            token: jwt.sign(
              { doctorId: doctor._id },
              'RANDOM_TOKEN_SECRET_KEY',
              { expiresIn: '24h' },
            )
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

exports.getFullDoctorsList = (req, res, next) => {
  Doctor.findOne({
    _id: req.doctorId,
    superAdmin: true,
  })
    .then((adminDoctor) => {
      if (adminDoctor) {
        Doctor.find({})
          .then((doctors) => {
            res.status(201).json({
              doctors,
            });
          })
      }
      else {
        res.status(500).json({
          error: 'erreur',
        });
      }
    });
};

exports.sendNewsletter = (req, res, next) => {
  Doctor.findOne({
    _id: req.doctorId,
    superAdmin: true,
  })
    .then((adminDoctor) => {
      if (adminDoctor) {
        Doctor.find()
          .then((doctors) => {
            mail.sendNewsletter(req.body.subject, req.body.content, adminDoctor, doctors);
            res.status(200).json({
              message: 'messages bien envoyés',
            });
          })
          .catch((error) => {
            res.status(400).json({ error,})
          })
      }
      else {
        res.status(500).json({
          error: 'erreur',
        });
      }
    });
}

// method to create parameter
exports.createDoctor = (req, res, next) => {
  Doctor.find({
    _id: req.doctorId,
    superAdmin: true,
  })
    .then((adminDoctor) => {
      if (adminDoctor) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            const doctor = new Doctor({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              job: req.body.job,
              civility: req.body.civility,
              appointmentFrequency: req.body.appointmentFrequency,
              appointmentDuration: req.body.appointmentDuration,
              appointmentDelay: req.body.appointmentDelay,
              oppeningHours: req.body.oppeningHours,
              oppeningDays: req.body.oppeningDays,
              password: hash,
              email: req.body.email,
              adress: req.body.adress,
              zip: req.body.zip,
              city: req.body.city,
              publicEmail: req.body.publicEmail,
              phone: req.body.phone,
              startPlanning: req.body.startPlanning,
              endPlanning: req.body.endPlanning,
              presentation: req.body.presentation,
              slug: req.body.slug,
              superAdmin: req.body.superAdmin,
              onlineAppointment: false,
              sessionType: [
                {
                    name: "Séance de suivi", 
                    duration: 30, 
                    groupSession: false, 
                    groupSize: 1, 
                    color: "#242a66"
                }, 
                {
                    name: "Première séance", 
                    duration: 30, 
                    groupSession: false, 
                    groupSize: 1.0, 
                    color: "#6CA054"
                },
              ],
            });
            console.log(`nouveau compte Praticien ${doctor.firstname} ${doctor.lastname}`);
            doctor.save().then(
              () => {
                res.status(201).json({
                  doctor,
                });
              }
            ).catch(
              (error) => {
                res.status(400).json({
                  error: error
                });
              }
            );
          }).catch((error) => {
            res.status(500).json({
              error,
            });
          });
      }
      else {
        res.status(500).json({
          error: 'erreur',
        });
      }
    });
};

exports.createPendingDoctor = (req, res, next) => {
  Doctor.findOne({ email: req.body.email })
    .then((doctor) => {
      if(doctor) {
        res.status(400).json({
          error: 'Adresse mail deja utilisée',
        });
      }
      else {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            const pendingDoctor = new PendingDoctor({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              job: req.body.job,
              civility: req.body.civility,
              appointmentFrequency: 30,
              appointmentDuration: 30,
              appointmentDelay: 1440,
              oppeningHours: [
                [
                  ['08:00', '12:00'],
                  ['14:00', '19:00']
                ],
                [
                  ['08:00', '12:00'],
                  ['14:00', '19:00']
                ],
                [
                  ['08:00', '12:00'],
                  ['14:00', '19:00']
                ],
                [
                  ['08:00', '12:00'],
                  ['14:00', '19:00']
                ],
                [
                  ['08:00', '12:00'],
                  ['14:00', '19:00']
                ],
                [
                  ['08:00', '12:00'],
                  ['14:00', '19:00']
                ],
                [
                  ['08:00', '12:00'],
                  ['14:00', '19:00']
                ],
             ],
              oppeningDays: ['0', '1', '1', '1', '1', '1', '0'],
              password: hash,
              email: req.body.email.trim().toLowerCase(),
              adress: req.body.adress,
              zip: req.body.zip,
              city: req.body.city,
              publicEmail: '',
              phone: '',
              startPlanning: '08:00',
              endPlanning: '20:00',
              presentation: 'votre texte de presentation',
              slug: `${req.body.firstname.trim()}-${req.body.lastname.trim()}-${req.body.city.trim()}`,
              superAdmin: false,
              avatar: '',
              onlineAppointment: false,
              groupSessions: false,
              groupSize: 1,
              sessionType: [
                {
                    name: "Séance de suivi", 
                    duration: 30, 
                    groupSession: false, 
                    groupSize: 1, 
                    color: "#242a66"
                }, 
                {
                    name: "Première séance", 
                    duration: 30, 
                    groupSession: false, 
                    groupSize: 1.0, 
                    color: "#6CA054"
                },
              ],
            });
            pendingDoctor.save(pendingDoctor)
              .then((newDoctor) => {
                console.log(`nouveau compte  Praticien en attente ${newDoctor.firstname} ${newDoctor.lastname}`);
                mail.confirmValidDoctorEmail(newDoctor);
                res.status(200).json(newDoctor);
              })
              .catch((error) => {
                res.status(400).json(error);
              })
          })
          .catch((error) => {
            res.status(400).json(error);
          });
      }
    });
}

exports.acceptPendingDoctor = (req, res, next) => {
  PendingDoctor.findOne({ _id: req.body.newDoctorId })
    .then((pendingDoctor) => {
      if (pendingDoctor) {
        Doctor.findOne({ email: pendingDoctor.email })
          .then((doctor) => {
            if (doctor) {
              res.status(500).json({
                error: 'compte deja validé',
              });
            }
            else {
              const newDoctor = new Doctor({
                firstname: pendingDoctor.firstname,
                lastname: pendingDoctor.lastname,
                job: pendingDoctor.job,
                civility: pendingDoctor.civility,
                appointmentFrequency: pendingDoctor.appointmentFrequency,
                appointmentDuration: pendingDoctor.appointmentDuration,
                appointmentDelay: pendingDoctor.appointmentDelay,
                oppeningHours: pendingDoctor.oppeningHours,
                oppeningDays: pendingDoctor.oppeningDays,
                password: pendingDoctor.password,
                email: pendingDoctor.email.trim().toLowerCase(),
                adress: pendingDoctor.adress,
                zip: pendingDoctor.zip,
                city: pendingDoctor.city,
                publicEmail: pendingDoctor.publicEmail,
                phone: pendingDoctor.phone,
                startPlanning: new Date(`2020/01/01 ${pendingDoctor.startPlanning}`),
                endPlanning: new Date(`2020/01/01 ${pendingDoctor.endPlanning}`),
                presentation: pendingDoctor.presentation,
                slug: pendingDoctor.slug.toLowerCase().replace(' ', '-'),
                superAdmin: pendingDoctor.superAdmin,
                onlineAppointment: false,
                groupSessions: false,
                groupSize: 1,
                appointmentPeriod: 30,
                sessionType: [
                  {
                      name: "Séance de suivi", 
                      duration: 30, 
                      groupSession: false, 
                      groupSize: 1, 
                      color: "#242a66"
                  }, 
                  {
                      name: "Première séance", 
                      duration: 30, 
                      groupSession: false, 
                      groupSize: 1.0, 
                      color: "#6CA054"
                  },
                ],
              });
              newDoctor.save()
                .then((doc) => {
                  PendingDoctor.deleteOne({ _id: pendingDoctor._id})
                    .then(() => {
                      mail.newDoctorAccount(doc._id);
                      console.log(`nouveau compte Praticien ${doc.firstname} ${doc.lastname}`);
                      res.status(201).json(doc);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                })
                .catch((error) => {
                  res.status(400).json(error);
                })
            }
          });
      }
      else {
        res.status(400).json({
          error: 'compte inconu',
        });
      }
    })
} 

// method to get one parameter
exports.getOneDoctor = (req, res, next) => {
  Doctor.findOne({
    _id: req.params.id
  }).then(
    (doctor) => {
      res.status(200).json(doctor);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to get one doctor by id without password
exports.getDoctorById = (req, res, next) => {
  Doctor.findOne({
    _id: req.params.id
  },
  {
    password: 0,
    email: 0,
  }).then(
    (doctor) => {
      res.status(200).json(doctor);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to get one doctor by id without password
exports.getDoctorBySlug = (req, res, next) => {
  Doctor.findOne({
    slug: req.params.slug
  },
  {
    password: 0,
    email: 0,
  }).then(
    (doctor) => {
      res.status(200).json(doctor);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to modify parameter
exports.modifyDoctor = (req, res, next) => {
  const doctor = new Doctor({
    _id: req.params.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    job: req.body.job,
    civility: req.body.civility,
    appointmentFrequency: req.body.appointmentFrequency,
    appointmentDuration: req.body.appointmentDuration,
    appointmentDelay: req.body.appointmentDelay,
    oppeningHours: req.body.oppeningHours,
    oppeningDays: req.body.oppeningDays,
    email: req.body.email,
    adress: req.body.adress,
    zip: req.body.zip,
    city: req.body.city,
    publicEmail: req.body.publicEmail,
    phone: req.body.phone,
    startPlanning: req.body.startPlanning,
    endPlanning: req.body.endPlanning,
    presentation: req.body.presentation,
    onlineAppointment: req.body.onlineAppointment,
    groupSessions: req.body.groupSessions,
    groupSize: req.body.groupSize,
    appointmentPeriod: req.body.appointmentPeriod,
    sessionType: req.body.sessionType,
    customMailText: req.body.customMailText,
  });
  Doctor.updateOne({_id: req.params.id}, doctor).then(
    (doc) => {
      console.log(`modification du compte praticien de ${doctor.firstname} ${doctor.lastname}`);
      res.status(201).json({
        doctor,
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyPassword = (req,res,next) => {
  if (req.body.password.length > 5) {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const doctor = new Doctor({
          _id: req.params.id,
          password: hash,
        });
        Doctor.updateOne({_id: req.params.id}, doctor).then(
          (doc) => {
            console.log(`mot de passe modifié pour le praticien ${doc.firstname} ${doc.lastname}`)
            res.status(201).json({
              doctor,
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      })
      .catch((error) => {
        res.status(400).json({
          error,
        })
      });
  }
  else {
    res.status(400).json({
      error: 'mot de passe trop court',
      password: req.body.password,
    });
  }
}

// method to delete parameter
exports.deleteDoctor = (req, res, next) => {
  Doctor.find({
    _id: req.doctorId,
    superAdmin: true,
  })
    .then((adminDoctor) => {
      if (adminDoctor) {
        Doctor.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
      else {
        res.status(500).json({
          error: 'erreur',
        });
      }
    });



};

exports.getAllDoctors = (req, res, next) => {
  Doctor.find({},{
    password: 0,
    email: 0,
  }).then(
    (doctors) => {
      res.status(200).json(doctors);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};