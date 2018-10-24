import {ProceduralFormDialog} from '../../../../field-rat-singleton'

function fetchJson(fieldDefinitionUrl) {
    return new Promise(
        (resolve, reject) => {
            fetch(
                fieldDefinitionUrl, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            ).then(response => response.json())
                .then(
                    decodedResponseBody => {
                        resolve(decodedResponseBody)
                    }
                );
        }
    )
}

/**
 * Shows a dialog that is meant for editing existing resources.
 * Only works if:
 *      1) The ID of the resource is already known and is pre-prepended to the resourceUrl
 *      2) There is a url where we can get the fieldDefinitions for the resource
 *
 * @param {String} title
 * @param {String} resourceUrlName
 * @param {String} resourceId
 * @param {String} reason
 */
export default function showZrcmsResourceEditFieldDialog(
    title,
    resourceUrlName,
    resourceId,
    reason
) {
    let resourceData;
    let fieldDefinitions;
    let dialog;

    const urls = {
        fieldDefinitionsGet: '/zrcms/api/fields/model/' + resourceUrlName + '-version-properties',
        resourceGet: '/zrcms/api/cms-resource/' + resourceUrlName + '/find/' + resourceId,
        versionCreate: '/zrcms/api/content-version/' + resourceUrlName + '/insert',
        resourceUpdate: '/zrcms/api/cms-resource/' + resourceUrlName + '/update',
    };

    function handleDialogSubmit(values) {
        fetch(urls.versionCreate, {
            credentials: 'include',
            method: 'post',
            body: JSON.stringify(
                {
                    properties: values,
                    createdReason: reason
                }
            ),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function (versionCreateResponse) {
            versionCreateResponse.json().then(versionCreateJson => {
                if (versionCreateResponse.ok) {
                    fetch(urls.resourceUpdate, {
                        credentials: 'include',
                        method: 'put',
                        body: JSON.stringify(
                            {
                                id: resourceData['id'],
                                published: resourceData['published'],
                                contentVersionId: versionCreateJson.data.id,
                                createdReason: reason
                            }
                        ),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    }).then(function (resourceUpdateResponse) {
                        resourceUpdateResponse.json().then(resourceUpdateJson => {
                            if (resourceUpdateResponse.ok) {
                                dialog.close();
                            } else {
                                dialog.setErrorMessages(
                                    'An error occurred while publishing the new version.',
                                )
                            }
                        });
                    })
                } else {
                    dialog.setErrorMessages(
                        'Invalid data was entered. Please check the form and try again.',
                        versionCreateJson.messages['contentVersion'].messages['properties'].messages
                    )
                }
            });
        })
    }

    Promise.all(
        [
            new Promise((resolve, reject) => {
                fetchJson(urls.fieldDefinitionsGet).then(decodedResponseBody => {
                    resolve(decodedResponseBody.data)
                })
            }),
            new Promise((resolve, reject) => {
                fetchJson(urls.resourceGet).then(decodedResponseBody => {
                    resolve(decodedResponseBody.data)
                })
            })
        ]
    ).then(values => {
        fieldDefinitions = values[0];
        resourceData = values[1];
        dialog = new ProceduralFormDialog(
            title,
            fieldDefinitions,
            resourceData['contentVersion']['properties'],
            {},
            handleDialogSubmit
        )
    });
}
