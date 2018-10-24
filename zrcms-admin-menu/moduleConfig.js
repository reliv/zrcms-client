import showEditCurrentSitePropertiesDialog from './field-dialog/showEditCurrentSitePropertiesDialog'
import showEditCurrentPagePropertiesDialog from './field-dialog/showEditCurrentPagePropertiesDialog'
import showPageAccessPropertiesDialogModalV from "../zrcms-admin-page-access/src/showPageAccessPropertiesDialogModalV";

/**
 * @TODO IMPORTANT NOTE! "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER" is just a place holder!
 * It may not be the way we make these old links work!
 */

export default {
    'zrcms-admin-menu': {
        'links': [
            {
                "text": "Page",
                "children": [
                    {
                        "text": "New Page",
                        "props": {
                            "href": "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmFormDialog('UNKNOWN_URI')"
                        }
                    },
                    {
                        "text": "Add/Remove/Arrange Plugins"
                    },
                    {
                        "text": "Page Properties",
                        "props": {
                            "onClick": showEditCurrentPagePropertiesDialog
                        }
                    },
                    {
                        "text": "Page Permissions",
                        "props": {
                            "onClick": () => {
                                showPageAccessPropertiesDialogModalV()
                            }
                        }
                    },
                    {
                        "text": "Copy To Template",
                        "props": {
                            "onClick": () => {
                                alert('@todo')
                            }
                        }
                    },
                    {
                        "text": "Drafts",
                        "props": {
                            "onClick": () => {
                                alert('@todo')
                            }
                        }
                    },
                    {
                        "text": "Restore",
                        "props": {
                            "onClick": () => {
                                alert('@todo')
                            }
                        }
                    },
                    {
                        "text": "Delete",
                        "props": {
                            "onClick": () => {
                                alert('@todo')
                            },
                            "href": "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmBlankDialog('\/modules\/rcm-admin\/page-delete\/page-delete.html')"
                        }
                    }
                ]
            },
            {
                "text": "Site",
                "children": [
                    {
                        "text": "Site Properties",
                        "props": {
                            "onClick": showEditCurrentSitePropertiesDialog,
                        }
                    },
                    {
                        "text": "Manage Sites",
                        "props": {
                            "href": "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmStandardDialog('\/modules\/rcm-admin\/manage-sites\/manage-sites.html')"
                        }
                    },
                    {
                        "text": "Create Site",
                        "props": {
                            "href": "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmStandardDialog('\/modules\/rcm-admin\/create-site\/create-site.html')"
                        }
                    },
                    {
                        "text": "Copy Pages",
                        "props": {
                            "href": "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmStandardDialog('\/modules\/rcm-admin\/site-page-copy\/site-page-copy.html')"
                        }
                    },
                    {
                        "text": "Translations",
                        "props": {
                            "href": "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmBlankDialog('\/modules\/rcm-i18n\/admin\/message-editor.html')"
                        }
                    },
                    {
                        "text": "Google Analytics",
                        "props": {
                            "href": "\/rcm-google-analytics"
                        }
                    },
                    {
                        "text": "Email Editor",
                        "props": {
                            "href": "javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmBlankDialog('\/modules\/app\/mailer\/index.html')"
                        }
                    },
                    {
                        "text": "Email Template List",
                        "props": {
                            "href": "\/admin\/list-email-templates"
                        }
                    },
                    {
                        "text": "Facebook Analytics",
                        "props": {
                            "href": "\/facebook-analytics\/edit"
                        }
                    },
                    {
                        "text": "Redirect Editor",
                        "props": {
                            "href": "\/redirect"
                        }
                    }
                ]
            },
            {
                "text": "Users",
                "children": [
                    {
                        "text": "Roles and Access",
                        "props": {
                            "href": "\/admin\/rcmuser-acl"
                        }
                    },
                    {
                        "text": "User Management",
                        "props": {
                            "href": "\/admin\/rcmuser-users"
                        }
                    },
                    {
                        "text": "Switch User",
                        "props": {
                            "href": "\/admin\/switch-user"
                        }
                    }
                ]
            },
            {
                "text": "Modules",
                "children": [
                    {
                        "text": "Cart",
                        "props": {
                            "href": "#"
                        }
                    },
                    {
                        "text": "Personal Websites",
                        "props": {
                            "href": "\/pws-employee-home"
                        }
                    },
                    {
                        "text": "Conference",
                        "props": {
                            "href": "\/conf"
                        }
                    },
                    {
                        "text": "Content Change Log (Under Construction')",
                        "props": {
                            "href": "\/zrcms\/change-log?days=30&content-type=text%2Fhtml"
                        }
                    }
                ]
            }
        ]
    }
}


/* THIS CODE WAS USED TO PRE-GENERATE THE ABOVE MENU FROM OLD CONFIG. HERE IT IS IN CASE YOU NEED TO TWEAK AND RE-RUN.
 $json = [];
 foreach ($this->serviceLocator->get('config')['navigation']['RcmAdminMenu'] as $mainKey => $main) {
 $children = '';
 foreach ($main['pages'] as $subKey => $sub) {
 if (!isset($sub['label'])) {
 throw new \Exception($mainKey . $subKey . ' has no label');
 }
 if (isset($sub['class'])) {
 if (strpos($sub['class'], 'rcmStandardDialog')) {
 $sub['uri'] = 'javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmStandardDialog('' . (isset($sub['uri']) ? $sub['uri'] : 'UNKNOWN_URI') . ')';
 }
 }
 if (isset($sub['class'])) {
 if (strpos($sub['class'], 'RcmBlankDialog')) {
 $sub['uri'] = 'javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmBlankDialog('' . (isset($sub['uri']) ? $sub['uri'] : 'UNKNOWN_URI') . ')';
 }
 }
 if (isset($sub['class'])) {
 if (strpos($sub['class'], 'RcmFormDialog')) {
 $sub['uri'] = 'javascript:rcmAdminMenuDialogLegacy_PLACEHOLDER.rcmFormDialog('' . (isset($sub['uri']) ? $sub['uri'] : 'UNKNOWN_URI') . ')';
 }
 }
 $children[] = [
 'text' => $sub['label'],
 'props' => isset($sub['uri']) ? [
 'href' => $sub['uri']
 ] : []
 ];
 }

 if (!isset($main['label'])) {
 throw new \Exception($mainKey . ' has no label');
 }
 $json[] = [
 'text' => $main['label'],
 'children' => $children
 ];
 }
 echo json_encode($json, JSON_PRETTY_PRINT);
 die;
 */
