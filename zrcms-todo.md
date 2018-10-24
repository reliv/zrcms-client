ZRCMS Admin
===========

BUGS
----

- html editor sometimes does not work, might be a dom timing issue

MUST
----

- Fix issue with updating the page properties.
    - We will need to do update page properties, warn about saving, go into edit mode
    - We should create a field dialog implementation using:
        - CurrentPageVersionData
        - Shows alert when data changed 
            "You must save and publish this page for your page property changes to take effect."
            + "\nClick 'Cancel' to revert these changes."
            - /www/web/public/app_components/zrcms/zrcms-admin-page-access/src/pageUpdateDataForPageAccess.js
        - pageUpdateData

- complete BC layer
    - pluginHandler.addPluginMenu
    - AjaxPluginEditHelper.attachPropertiesDialog
    - AjaxPluginEditHelper.buildInputGroup
    - AjaxPluginEditHelper.captureInputGroup
    - AjaxPluginEditHelper.buildEmailInputGroup

- User roles for page access (/www/web/public/app_components/zrcms/zrcms-admin-page-access)
    - Override rcm/user-api Middleware with reliv app permission middleware so the access is correct (not sure what the access is right now)

- New Page creation (/www/web/public/app_components/zrcms/zrcms-admin-new-page)

- Page Site Copy (/www/web/public/app_components/zrcms/zrcms-admin-site-page-copy)

- More admin menus @see /www/web/public/app_components/zrcms/zrcms-admin-menu/moduleConfig.js

- Dafts list?

- Restore ?

- Delete


Could
-----

- Allow editor getSaveData to be called multiple times??
    - is only called once which forces us to redirect even when nothing changed or only site blocks changed
    - Might be a bit risky as the editors may be stateful or at least were not designed for this

- BC - Fields with field defaults should be converted to defaultConfig defaultInstanceConfig?
- Resize drag smoothing (dont apply class until mouse up)
- Toolbar for editor
    - Apply 
- port rcm-file-chooser
- rcm-compatibility: move legacy in there as needed 

