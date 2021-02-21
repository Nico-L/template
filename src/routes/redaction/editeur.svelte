<script>
import {onMount, onDestroy, tick} from 'svelte';
import AutoComplete from '../../components/simpleAutoComplete.svelte'

import {espacesBF} from '../../stores/espacesBF.js'
import {user} from "../../stores/user.js"
import {tagsArticlesStore} from "../../stores/tagsArticles.js"

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker'
import Underline from '@editorjs/underline'
import InlineCode from '@editorjs/inline-code'
import Galerie from '../../editorjs/galerie/galerie.js'
import LinkTool from '../../editorjs/linkTool'

import {dateJourMoisHeure} from "../../utils/dateFr.js"

import ImageUpload from '../../components/imageUpload.svelte';
import Editeur from '../../components/editeur.svelte';
import Chargement from '../../components/chargement.svelte'
import Bouton from '../../components/Button/Button.svelte'
import Fa from 'svelte-fa'
import { faSave, faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import {getArticleById, updateArticle} from '../../strapi/articles.js'
import {listeIllustrationsOrphelines, effaceIllustration} from '../../strapi/illustrations.js'

let editorjs;
let editor;

var firstSave = false
let dataArticle = undefined
var dataBanniere = {
    espaces: 4,
    tags: 4
}
const optionsURL= {
    'resizing_type': 'fill',
    'width': 300,
    'height': 140,
    'gravity': 'ce'
}

var flagArticleLoading = true
var newTag = null

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idArticle =urlParams.get('id')

var horaireDerniereSauvegarde = (new Date()).getTime()
var delta = 0
let intervalId
let intervalSauvegarde

var flagSauvegardeEnCours = false
var flagSauvegardeSucces = false
var urlBanniere = ""
let autoCompleteTags

$: {
    if (dataArticle !== undefined && newTag !== null) {
        dataArticle.tags_articles.push(newTag)
    }
    newTag = null
    }

onMount(()=> {
    getArticleById(idArticle).then(async (article) => {
        dataArticle = {
            ...article
        }
        urlBanniere = 'https://cms.labonnefabrique.fr' + article.banniere.illustration[0].url
        let dataTemp
        if (article.data !== null) {
            dataTemp = article.data
        } else {
            dataTemp = {
                blocks: [
                    {
                        type: "paragraph",
                        data: {text:""}
                    }
                ]
            }
        }
        flagArticleLoading = false
        await tick();
        editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            holder: editorjs,
            tools: {
                linkTool: {
                    class: LinkTool,
                    shortcut: 'CMD+SHIFT+L',
                    config: {
                        endpoint: 'https://cms.labonnefabrique.fr/getmetadata', // Your backend endpoint for url data fetching
                    }
                },
                galerie: {
                    class: Galerie,
                    shortcut: 'CMD+SHIFT+G',
                    config: {
                        user: $user.id,
                        articles: parseInt(idArticle),
                        espaces: dataArticle.espace.id,
                        tags: 5,
                        token: $user.jwt
                    }
                },
                header: {
                    class: Header,
                    inlineToolbar : true,
                    config: {
                        placeholder: 'Un titre'
                    },
                    },
                list: {
                    class: List,
                    inlineToolbar: true
                },
                marker: {
                    class: Marker,
                    inlineToolbar: true
                },
                underline: {
                    class: Underline,
                    inlineToolbar: true
                },
                inlineCode: {
                    class: InlineCode,
                    inlineToolbar: true
                }

            },
              /**
             * Internationalzation config
             */
            i18n: {
                /**
                 * @type {I18nDictionary}
                 */
                messages: {
                /**
                 * Other below: translation of different UI components of the editor.js core
                 */
                ui: {
                    "blockTunes": {
                    "toggler": {
                        "Click to tune": "Нажмите, чтобы настроить",
                        "or drag to move": "ou faire glisser"
                    },
                    },
                    "inlineToolbar": {
                    "converter": {
                        "Convert to": "Conversion"
                    }
                    },
                    "toolbar": {
                    "toolbox": {
                        "Add": "Ajouter"
                    }
                    }
                },
            
                /**
                 * Section for translation Tool Names: both block and inline tools
                 */
                toolNames: {
                    "Text": "Texte",
                    "Heading": "En-tête",
                    "List": "Liste",
                    "Warning": "Avertissement",
                    "Checklist": "Checklist",
                    "Quote": "Citation",
                    "Code": "Code",
                    "Delimiter": "Séparateur",
                    "Raw HTML": "HTML brut",
                    "Table": "Table",
                    "Link": "Lien",
                    "Marker": "Surligneur",
                    "Bold": "Gras",
                    "Italic": "Italique",
                    "InlineCode": "Code en ligne",
                    "Underline": "Souligner"
                },
            
                /**
                 * Section for passing translations to the external tools classes
                 */
                tools: {
                    /**
                     * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
                     * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
                     */
                    "warning": { // <-- 'Warning' tool will accept this dictionary section
                    "Title": "un warning",
                    "Message": "uh ?",
                    },
            
                    /**
                     * Link is the internal Inline Tool
                     */
                    "link": {
                    "Add a link": "Ajouter un lien"
                    },
                    /**
                     * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
                     */
                    "stub": {
                    'The block can not be displayed correctly.': 'Le bloc n\'a pas pu s\'afficher correctement'
                    }
                },
            
                /**
                 * Section allows to translate Block Tunes
                 */
                blockTunes: {
                    /**
                     * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
                     * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
                     *
                     * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
                     */
                    "delete": {
                    "Delete": "Effacer"
                    },
                    "moveUp": {
                    "Move up": "Remonter"
                    },
                    "moveDown": {
                    "Move down": "Descendre"
                    }
                },
                }
            },
            onReady: () => {
                editor.focus(true)
                intervalId = setInterval(tempsDepuisDerniereSauvegarde, 60*1000);
                intervalSauvegarde = setInterval(enregistreArticle, 5*60*1000)
                console.log('Editor.js is ready to work!')
            },
            onChange: () => {
                editor.save().then((outputData) => {
                dataArticle.data = outputData
                console.log('Article data: ', outputData)
                }).catch((error) => {
                console.log('Saving failed: ', error)
                });
            },
            autofocus: true,
            data: dataTemp
        });
    })
})

onDestroy(() => {
    clearInterval(intervalId)
})

function tempsDepuisDerniereSauvegarde() {
    const temps = (new Date()).getTime()
    delta = Math.floor((temps - horaireDerniereSauvegarde)/1000/60)
}

function enregistreArticle() {
    flagSauvegardeEnCours = true
    flagSauvegardeSucces = false
    var variables = {...dataArticle}
    variables.illustrations = []
    dataArticle.data.blocks.forEach((block) => {
        if (block.type === 'galerie') {
            block.data.urls.forEach((url) => {
                if (url.idIllu !== 0 && url.idImage !== 0)
                {
                    variables.illustrations.push(url.idIllu)
                }
            })
        }
    })
    variables.banniere = dataArticle.banniere.id
    variables.user = $user.id
    variables.espace = dataArticle.espace.id
    updateArticle(dataArticle.id, variables).then((retour)=>{
        listeIllustrationsOrphelines(5, $user.id).then((listeIllustrations) => {
            setTimeout(function(){ flagSauvegardeSucces = false; }, 5*1000);
            delta = 0
            flagSauvegardeEnCours = false
            flagSauvegardeSucces = true
            listeIllustrations.forEach((illu) => {
                if (illu.article === null) {
                    effaceIllustration({illustrationId: illu.id, imageId: illu.illustration[0].id}).then((retourDelete) => {
                    })
                }
            })
        })
    })
}

function effacerTag(index) {
        dataArticle.tags_articles.splice(index, 1)
        dataArticle = dataArticle
    }

  let combo = [];
  $: if (combo.length > 0) {
      console.log("combo", combo[combo.length-2], combo[combo.length-1])
      if (combo[combo.length-2] === "Control" && combo[combo.length-1] === "s") enregistreArticle()
      };
</script>

<svelte:body
  on:keyup|preventDefault={() => {
    combo = [];
  }}
  on:keydown={(event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            enregistreArticle()
            break;
        }
    }
    }
  } />

<main class="grid grid-cols-2 text-gray-500">
{#if !flagArticleLoading}
    <div>
        <div
            class="bg-gray-900 text-gray-200 text-4xl w-720px appearance-none leading-normal px-4 pl-8 rounded-md focus:bg-gray-800 focus:outline-none"
            contenteditable="true"
            bind:innerHTML={dataArticle.titre}
        >
        </div>
        <div bind:this={editorjs} class="cadreEditeur"></div>
    </div>
    <div class="fixed w-340px ml-720px h-full p-2 border border-gray-800 rounded-md m-2 my-4 z-50 overflow-y-auto scrollbar scrollbar-thumb-bleuLBF scrollbar-track-bleuLBFTT">
        <div class="grid grid-cols-2 gap-x-1 my-3">
            <Bouton largeur="w-auto" bind:occupe={flagSauvegardeEnCours} bind:succes={flagSauvegardeSucces} on:actionBouton={enregistreArticle}  couleur="text-vertLBF border-vertLBF">
                <div class="flex flex-row justify-center mx-auto">
                    <Fa icon={faSave} size="lg" />
                    <div class="ml-2">Sauvegarder</div>
                </div>
            </Bouton>
            <Bouton largeur="w-auto" couleur="text-orangeLBF border-orangeLBF">
                <div class="flex flex-row justify-center">
                    <Fa icon={faNewspaper} size="lg" /> 
                    <div class="ml-2">
                        Publier
                    </div>
                </div>
            </Bouton>
        </div>
        <hr class="ml-2 my-6 w-5/6 border-gray-700 mx-auto"/>
        <div class="mb-6">
            <div class="mb-1 text-base">
                <label for="selectEspaces" class="flex flex-row">
                    <div class="mr-2 font-medium  text-bleuLBF">Espace concerné</div>
                    <select bind:value={dataArticle.espace.id} id="selectEspaces" class="bg-gray-900 border border-bleuLBF rounded" >
                        {#each $espacesBF as espace}
                            <option value={espace.id}>
                                {espace.label}
                            </option>
                        {/each}
                    </select>
                </label>
            </div>
            <div class="mb-1 mr-2">
                <span class="font-medium text-bleuLBF">Statut :</span>
                <span>
                    {#if dataArticle.published_at === null}
                        brouillon
                    {:else}
                        publié le {dateJourMoisHeure(dataArticle.updated_at)}
                    {/if}
                </span>
            </div>
            <div class="mr-2">
                <div>
                    <span class="font-medium text-bleuLBF">Dernière sauvegarde :</span>
                    <span>il y a {delta} min.</span>
                </div>
                <div class="text-sm">(sauvegarde automatique toutes les 5 min.)</div>
            </div>
        </div>
        <div class="mb-6">
            <h5 class="text-vertLBF">Illustration de l'article</h5>
            <div class="ml-1">Utilisée en une du site</div>
            <ImageUpload
                userId = {dataArticle.user.id}
                espaceId = {dataArticle.espace.id}
                tagId = 4
                bind:urlImage = {urlBanniere}
                bind:dataImage = {dataArticle.banniere}
                options = {optionsURL}
                altImage="bannière article"
                classImage="rounded border-2 border-vertLBF mx-auto w-300px h-150px" />
        </div>
        <div class="mb-6">
            <h5 class="text-jauneLBF">Chapeau</h5>
            <div class="ml-1">Quelques lignes décrivant le sujet de l'article. Utilisé en une du site.</div>
            <Editeur bind:contenu={dataArticle.chapeau} couleur="jaune"/>
        </div>
        <div class="mb-6">
            <h5 class="text-orangeLBF">Tags</h5>
            <div class="ml-1">Les tags sont des mots permettant de classer les articles et de faire des recherches dans la liste des articles</div>
            <AutoComplete
                items={$tagsArticlesStore}
                bind:selectedItem={newTag}
                labelFieldName="tag" 
                inputClassName="bg-gray-900 text-gray-200 focus:outline-none border border-orangeLBF rounded py-2 px-4 block w-full appearance-none leading-normal"
                hideArrow="true"
                className="my-4 w-full"
                dropdownClassName = "bg-gray-800 text-gray-500"
                />
            <div class="mx-2 flex flew-row flex-wrap justify-start">
                {#each dataArticle.tags_articles as tag, index}
                    <div class="h-6 mx-1 my-1 p-2 rounded-full text-orangeLBF border border-orangeLBF flex flex-row items-center text-sm">
                        <div class="cursor-pointer"  on:click={() => {effacerTag(index)}}><Fa icon={faTimes} /></div>
                        <span class="ml-2 font-semibold">{tag.tag}</span>
                    </div>
                {/each}
            </div>
        </div>
        <hr class="border-gray-700 my-2 w-5/6">
    </div>
{:else}
    <Chargement><h3>Récupération de l'article, merci de patienter...</h3></Chargement>
{/if}
</main>