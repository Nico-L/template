<script>
import Bouton from '../../components/Button/Button.svelte';
import Fa from 'svelte-fa'
import { faSave, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {newUser} from '../../strapi/users.js'

var occupe = false
var succes = false
var connu = false

var userName = ""
var email = ""
var password = ""
var passwordVerif = ""

var erreur = "text-gray-200"
var message = "Merci de renseigner les informations suivantes."

/*function demandeLien() {
    if (email==="") {
        return
    }
    occupe = true
    succes = false
    var entetes = new Headers({"content-type": "application/json"});
    var options = { 
        method: 'POST',
        headers: entetes,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
            email: email
        })
    };
    fetch('https://cms.labonnefabrique.fr/auth/forgot-password', options)
        .then((retour)=>
            retour.json().then((retour2)=> {
                occupe=false
                if (retour2.ok) {
                    succes = true
                }
            })
        ).catch((erreur)=>{
            console.log('une erreur a eu lieu', erreur)
        })
    }*/

function enregistrement() {
        const regexMail = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i.exec(email)
        const mailValide = regexMail!==null
        if (email==="" || !mailValide) {
            message = "Merci de renseigner une adresse email valide"
            erreur = "text-rougeLBF"
            return
        }
        if (password === "") {
            message = "Veuillez entrer un mot de passe."
            erreur = "text-rougeLBF"
            return 
        }
        if (password !== passwordVerif) {
            message = "Vos mots de passe ne correspondent pas."
            erreur = "text-rougeLBF"
            return  
        }
        occupe = true
        succes = false
        var entetes = new Headers({"content-type": "application/json"});
        var options = { 
            method: 'POST',
            headers: entetes,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                username: userName,
                confirmed: true,
                email: email,
                password: password
            })
        };
        const variables = {
                username: userName,
                confirmed: true,
                email: email,
                password: password
            }
        newUser(variables).then((retour) =>{
            occupe=false
            if (retour.statusCode && retour.statusCode === 400) {
                if (retour.message === "missing.password") {
                    message = "Merci de renseigner votre mot de passe"
                    erreur = "text-rougeLBF"
                } else if (retour.message[0] && retour.message[0].messages[0].id === "Auth.form.error.email.taken") {
                    message = "Un compte avec cet email a déjà été créé. Vous pouvez réinitialiser votre mot de passe en cliquant sur le bouton ci-dessous"
                    connu = true
                } else if (retour.message[0] && retour.message[0].messages[0].id === "Auth.form.error.username.taken") {
                    message = "Ce nom d'utilisateur est déjà pris, merci de le modifier"
                    erreur = "text-rougeLBF"
                }
            } else {
                window.location.replace(window.location.origin + '/utilisateurs/fiche?email=' + email)
            }
        })
        /*fetch('https://cms.labonnefabrique.fr/users', options)
            .then((retour)=>
                retour.json().then((retour2)=> {
                    console.log('retour user creation', retour2)
                    occupe=false
                    if (retour2.statusCode && retour2.statusCode === 400) {
                        if (retour2.message === "missing.password") {
                            message = "Merci de renseigner votre mot de passe"
                            erreur = "text-rougeLBF"
                        } else if (retour2.message[0] && retour2.message[0].messages[0].id === "Auth.form.error.email.taken") {
                            message = "Un compte avec cet email a déjà été créé. Vous pouvez réinitialiser votre mot de passe en cliquant sur le bouton ci-dessous"
                            connu = true
                        } else if (retour2.message[0] && retour2.message[0].messages[0].id === "Auth.form.error.username.taken") {
                            message = "Ce nom d'utilisateur est déjà pris, merci de le modifier"
                            erreur = "text-rougeLBF"
                        }
                    } else {
                        //window.location.replace(window.location.origin + '/utilisateurs/fiche?email=' + email)
                    }
                })
            ).catch((erreur)=>{
                console.log('une erreur a eu lieu', erreur)
            }) */
    }

</script>

<main class="mt-4 mb-3 max-w-480px">
    <div class="h4">Ajout d'un nouvel utilisateur</div>
    <div>
        <div class={"mb-2 text-justify text-sm " + erreur}>{message}</div>
        <input 
            class="mb-2 text-sm bg-gray-900 text-gray-200 focus:outline-none border border-vertLBFT rounded py-1 px-2 block w-full appearance-none leading-normal"
            type="text"
            id="userName"
            placeholder="Nom d'utilisateur"
            bind:value={userName}
            />
        <input 
            class="mb-2 text-sm bg-gray-900 text-gray-200 focus:outline-none border border-vertLBFT rounded py-1 px-2 block w-full appearance-none leading-normal"
            type="text"
            id="identifiant"
            placeholder="email"
            bind:value={email}
            />
        <input 
            class="mb-2 text-sm bg-gray-900 text-gray-200 focus:outline-none border border-vertLBFT rounded py-1 px-2 block w-full appearance-none leading-normal"
            type="password"
            id="password"
            placeholder="Entrez un MDP"
            bind:value={password}
            />
        <input 
            class="mb-2 text-sm bg-gray-900 text-gray-200 focus:outline-none border border-vertLBFT rounded py-1 px-2 block w-full appearance-none leading-normal"
            type="password"
            id="passwordVerif"
            placeholder="Vérification MDP"
            bind:value={passwordVerif}
            />
    </div>
    <div class="mt-2">
        <Bouton occupe={occupe} succes={succes} border="border-1" largeur="w-full" couleur="text-vertLBF border-vertLBF" on:actionBouton={() => {enregistrement()}}>
            <div class="mx-auto flex flex-row justify-center">
                <div class="px-1 self-center">Enregistrer</div>
                <div class="px-1 self-center"><Fa icon={faSave} size="lg" class="mx-auto" /></div>
            </div>
        </Bouton>
    </div> 
</main>