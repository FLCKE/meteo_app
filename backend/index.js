const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
// const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const { throwError, last } = require('rxjs');

const app = express();

app.use(cors());
app.use(bodyparser.json());

const sqlite3 = require('sqlite3').verbose();

// Ouvrir une connexion à la base de données (ou créer un nouveau fichier si la base de données n'existe pas)
const db = new sqlite3.Database('database.sqlite', (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données', err.message);
    } else {
        console.log('Connexion à la base de données réussie');
    }
});

app.listen(3306, () => {
    console.log("serve running to http://localhost:3306")
})

app.get('/user-by-id', (req, resp) => {
    let requete = "SELECT * FROM `user` WHERE id=" + req.query.userId;
    db.each(requete, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length != 0) {
                resp.send(
                    {
                        message: 'user',
                        data: result,
                    }
                )
                console.log("data reclaim");
            }
        }
    })
})
app.get('/login', (req, resp) => {
    console.log('fffffffffffffffffffffffffffffff');
    let email = req.query.email;
    console.log(email);
    let password = req.query.password;
    let requete = "SELECT * from `user` WHERE  `user_email`= '" + email + "'";

    db.each(requete, (err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log(result);
            checkPassword(password, result.user_password).then((chechResult) => {
                if (chechResult) {

                    resp.send(
                        {
                            message: 'user ',
                            data: result,
                        }
                    )
                    console.log("data reclaim");
                }else{
                    console.log("introuvable");
                    resp.status(400).json({ message: "echec" });
                    return err = new Error("pas trouver");
                }
            })
            // if (result.length != 0) {
            // }
        }
    })
})
app.post('/add-user', (req, res) => {
    const data = req.body;
    console.log(data.user_password);
    hashPassword(data.user_password).then((hashed) => {

        let requete = " INSERT INTO `user`( `user_name`, `user_email`, `user_password`) VALUES('" + data.user_name + "', '" + data.user_email + "', '" + hashed + "')";
        db.run(requete, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                let requete2 = "SELECT user_id from `user` WHERE  `user_email`= '" + data.user_email + "'";
                db.each(requete2, (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        id = result1.user_id;

                        let requete3 = " INSERT INTO `favoris`( `user_id`) VALUES('" + id + "')";
                        db.run(requete3, (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.status(201).json({ message: "reussir" });
                            }
                        });
                    }
                });

                // res.status(201).json({ message: "reussir" });
            }
        });
    })

})
app.post('/update-user', (req, res) => {
    const data = req.body;
    let password = data.user_password;


    let requete = "SELECT * from `user` WHERE  `user_email`= '" + data.user_email + "'";

    db.each(requete, (err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            if (result.length != 0) {
                checkPassword(password, result.user_password).then((chechResult) => {
                    console.log(result);
                    if (chechResult) {
                        let requete = " UPDATE `user` set `user_name`='" + data.user_name + "',`user_email`='" + data.user_email + "' where user_id='" + req.query.user_id + "'";
                        db.run(requete, (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("succeed");
                                res.status(200).json({ message: "reussir" });

                            }
                        });
                    }
                })
            } else {
                console.log("introuvable");
                return err = new Error("pas trouver");
            }
        }
    })

})
app.post('/add_state', (req, res) => {
    console.log(req.body);
    const data = req.body;
    let cp_id = req.query.cp_id;

    console.log(data.state + "\n" + cp_id);
    if (cp_id == 0) {
        let requete = " UPDATE `favoris` set `cp0`='" + data.code + "' where user_id='" + data.user_Id + "'";
        db.run(requete, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ message: "reussir" });
            }
        });
    } else if (cp_id == 1) {
        let requete = " UPDATE `favoris` set `cp1`='" + data.code + "' where user_id='" + data.user_Id + "'";
        db.run(requete, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.status(200).json({ message: "reussir" });
            }
        });

    } else if (cp_id == 2) {
        let requete = " UPDATE  `favoris` set `cp2`='" + data.code + "' where user_id='" + data.user_Id + "'";
        db.run(requete, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ message: "reussir" });
            }
        });
    }
    // let requete = " INSERT INTO `files`( `cp1`, `cp2`, `cp2`, `user_id`) VALUES('" + data.fileName + "', '" + data.fileCategory + "', '" + data.filePath + "', '" + data.userId + "')";
    // db.run(requete, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.status(201).json({ message: "reussir" });
    //     }
    // });
})
app.get('/select_fav', (req, res) => {
    let user_id = req.query.user_id;
    console.log(user_id);
    let requete = "SELECT cp0, cp1, cp2 FROM `favoris` WHERE `user_id`='" + user_id + "'";

    db.all(requete, (err, result) => {// utiliser le all pour recuperer beaucoup d'info a la fois 
        if (err) {
            console.log(err);
            return err;
        } else {
            if (result.length != 0) {
                console.log(result);
                res.send(
                    {
                        message: "yours favoris",
                        data: result,
                    }
                )
                return true;
            } else {
                res.send(
                    {
                        message: "you haven't data",
                        data: result,
                    }
                )
                return false;
            }
        }

    }
    )
})
async function hashPassword(password) {
    var hashed = await bcrypt.hash(password, 10);
    return hashed;
}
async function checkPassword(password, hashed) {
    var result = await bcrypt.compare(password, hashed);
    return result;
}