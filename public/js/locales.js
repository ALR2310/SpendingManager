var langObj;

async function applyLanguage(lang) {
    try {
        const res = await $.ajax({
            type: 'get',
                url: urlapi + `/locales/${lang}.json`
        });

        langObj = res;

        //sidebar
        $('#page-home .speech').text(langObj.sideBar.pageHome)
        $('#page-spending .speech').text(langObj.sideBar.pageSpending)
        $('#page-statics .speech').text(langObj.sideBar.pageStatics)
        $('#page-noted .speech').text(langObj.sideBar.pageNoted)
        $('#page-spendlist .speech').text(langObj.sideBar.pageList)
        $('#page-profile .speech').text(langObj.sideBar.pageProfile)
        $('#page-setting .speech').text(langObj.sideBar.pageSettings)
        $('#page-logout .speech').text(langObj.sideBar.pageLogout)

        // Home Page
        $('#home-statics [name="today"]').text(langObj.homePage.statics.today)
        $('#home-statics [name="yesterday"]').text(langObj.homePage.statics.yesterday)
        $('#home-statics [name="thisWeek"]').text(langObj.homePage.statics.thisWeek)
        $('#home-statics [name="lastWeek"]').text(langObj.homePage.statics.lastWeek)
        $('.crypto a').attr('title', langObj.homePage.crypto.details)
        $('.crypto [name="change"]').attr('title', langObj.homePage.crypto.change)
        $('.crypto [name="volume"]').attr('title', langObj.homePage.crypto.volume)
        $('.crypto [name="price"]').attr('title', langObj.homePage.crypto.price)
        $('.crypto [name=more]').text(langObj.homePage.crypto.more)
        $('#tbl_weatherSearch').attr('placeholder', langObj.homePage.weather.search)

        // Spending Page
        $('.spend-search [name="day"]').text(langObj.spendingPage.search.filter.day)
        $('.spend-search [name="month"]').text(langObj.spendingPage.search.filter.month)
        $('.spend-search #txtSearch').attr('placeholder', langObj.spendingPage.search.title)
        $('.spend-table [name="day"]').text(langObj.spendingPage.table.day)
        $('.spend-table [name="name"]').text(langObj.spendingPage.table.name)
        $('.spend-table [name="price"]').text(langObj.spendingPage.table.price)
        $('.spend-table [name="details"]').text(langObj.spendingPage.table.details)
        $('#btnCreate').text(langObj.spendingPage.button.add)
        $('#btnUpdate').text(langObj.spendingPage.button.edit)
        $('#btnDelete').text(langObj.spendingPage.button.delete)
        $('#btnClearData span').text(langObj.spendingPage.button.clear)
        $('#btn-excel_export [name="output"]').text(langObj.spendingPage.button.output)
        $('#btn-pdf_export [name="output"]').text(langObj.spendingPage.button.output)
        $('#spend-field #spendDate').attr('placeholder', langObj.spendingPage.field.date)
        $('#spend-field #spendName').attr('placeholder', langObj.spendingPage.field.name)
        $('#spend-field #spendPrice').attr('placeholder', langObj.spendingPage.field.price)
        $('#spend-field #spendDetails').attr('placeholder', langObj.spendingPage.field.details)
        $('#spend-field [for="spendName"]').text(langObj.spendingPage.field.name)
        $('#spend-field [for="spendPrice"]').text(langObj.spendingPage.field.price)
        $('#spend-field [for="spendDetails"]').text(langObj.spendingPage.field.details)
        $('#spendTotal [name="quantity"]').text(langObj.spendingPage.total.quantity)
        $('#spendTotal [name="total"]').text(langObj.spendingPage.total.total)
        $('#spendTotal [name="totalList"]').text(langObj.spendingPage.total.totalList)
        $('.spend-modal_list .modal-title').text(langObj.spendingPage.modal.list.title)
        $('.spend-modal_list input').attr('placeholder', langObj.spendingPage.modal.list.name)
        $('.spend-modal_list [name="close"]').text(langObj.spendingPage.button.close)
        $('.spend-modal_list [name="save"]').text(langObj.spendingPage.button.save)
        $('.spend-modal_delete strong').text(langObj.spendingPage.modal.delete.title)
        $('.spend-modal_delete label').text(langObj.spendingPage.modal.delete.reminder)
        $('.spend-modal_delete [name="close"]').text(langObj.spendingPage.button.close)
        $('.spend-modal_delete [name="delete"]').text(langObj.spendingPage.button.delete)
        $('.spend-modal_details [name="status"]').text(langObj.spendingPage.modal.details.status)
        $('.spend-modal_details [name="name"]').text(langObj.spendingPage.modal.details.name)
        $('.spend-modal_details [name="price"]').text(langObj.spendingPage.modal.details.price)
        $('.spend-modal_details [name="dateAdd"]').text(langObj.spendingPage.modal.details.dateAdd)
        $('.spend-modal_details [name="dateUpdate"]').text(langObj.spendingPage.modal.details.dateUpdate)
        $('.spend-modal_details [name="moreInfor"]').text(langObj.spendingPage.modal.details.moreInfor)

        // Statics Page
        $('#statistical [name="totalItem"]').text(langObj.staticsPage.statics.totalItem)
        $('#statistical [name="totalDay"]').text(langObj.staticsPage.statics.totalDay)
        $('#statistical [name="totalList"]').text(langObj.staticsPage.statics.totalList)
        $('#statistical [name="today"]').text(langObj.staticsPage.statics.today)
        $('#statistical [name="yesterday"]').text(langObj.staticsPage.statics.yesterday)
        $('#statistical [name="thisWeek"]').text(langObj.staticsPage.statics.thisWeek)
        $('#statistical [name="lastWeek"]').text(langObj.staticsPage.statics.lastWeek)
        $('.statics_chart [name="title"]').text(langObj.staticsPage.chart.title)
        $('.statics_chart [name="title1"]').text(langObj.staticsPage.chart.title1)
        $('.statics_chart [name="day"]').text(langObj.staticsPage.chart.day)
        $('.statics_chart [name="week"]').text(langObj.staticsPage.chart.week)
        $('.statics_chart [name="month"]').text(langObj.staticsPage.chart.month)
        $('.statics_chart [name="year"]').text(langObj.staticsPage.chart.year)
        $('.statics_chart [name="options"]').text(langObj.staticsPage.chart.options)
        $('.statics_chart [name="view"]').text(langObj.staticsPage.chart.view)
        $('.statics_chart [name="default"]').text(langObj.staticsPage.chart.default)
        $('#chart_table [name="name"]').text(langObj.staticsPage.table.name)
        $('#chart_table [name="price"]').text(langObj.staticsPage.table.price)

        // Note Page
        $('#txt-notedSearch').attr('placeholder', langObj.notePage.search)
        $('#txt-notedSearch').attr('title', langObj.notePage.search)
        $('#txt-notedAdd').attr('placeholder', langObj.notePage.new)
        $('#txt-notedAdd').attr('title', langObj.notePage.new)
        $('[name="notify"]').text(langObj.notePage.notify)
        $('.noted-content [name="edit"]').text(langObj.notePage.button.edit)
        $('.noted-content [name="delete"]').text(langObj.notePage.button.delete)
        $('#btn-noted-close').text(langObj.notePage.button.close)
        $('#btn-noted-save').text(langObj.notePage.button.save)

        // List Page
        $('#offcanvasSpendlist [name="title"]').text(langObj.listPage.title)
        $('#offcanvasSpendlist [name="add"] [name="name"]').text(langObj.listPage.add.name)
        $('#offcanvasSpendlist [name="add"] [name="input"]').attr('placeholder', langObj.listPage.add.input)
        $('#offcanvasSpendlist #spendlistTbl [name="name"]').text(langObj.listPage.table.name)
        $('#offcanvasSpendlist #spendlistTbl [name="date"]').text(langObj.listPage.table.date)
        $('#offcanvasSpendlist #spendlistTbl [name="total"]').text(langObj.listPage.table.total)
        $('#modalConfirmDeleteList strong').text(langObj.listPage.modal.delete.title)
        $('#modalConfirmDeleteList label').text(langObj.listPage.modal.delete.reminder)
        $('#modalConfirmDeleteList [name="close"]').text(langObj.listPage.modal.delete.button.close)
        $('#modalConfirmDeleteList [name="delete"]').text(langObj.listPage.modal.delete.button.delete)

        // Profile Page
        $('#offcanvasProfile .offcanvas-title').text(langObj.profilePage.title)
        $('#offcanvasProfile #oldPassword').attr('placeholder', langObj.profilePage.password.old)
        $('#offcanvasProfile #newPassword').attr('placeholder', langObj.profilePage.password.new)
        $('#offcanvasProfile #confirmPassword').attr('placeholder', langObj.profilePage.password.confirm)
        $('#offcanvasProfile #btnChangePassword').text(langObj.profilePage.button.save)

        // Settings Page
        $('#offcanvasSetting .offcanvas-title').text(langObj.settingPage.title)
        $('#offcanvasSetting [name="theme"]').attr('data-bs-content', langObj.settingPage.theme.desc)
        $('#offcanvasSetting [name="theme"] strong').text(langObj.settingPage.theme.name)
        $('#offcanvasSetting [name="theme"] [value="light"]').text(langObj.settingPage.theme.value.light)
        $('#offcanvasSetting [name="theme"] [value="dark"]').text(langObj.settingPage.theme.value.dark)
        $('#offcanvasSetting [name="theme"] [value="auto"]').text(langObj.settingPage.theme.value.auto)
        $('#offcanvasSetting [name="defPage"]').attr('data-bs-content', langObj.settingPage.defPage.desc)
        $('#offcanvasSetting [name="defPage"] strong').text(langObj.settingPage.defPage.name)
        $('#offcanvasSetting [name="defPage"] [value="home"]').text(langObj.settingPage.defPage.value.home)
        $('#offcanvasSetting [name="defPage"] [value="spending"]').text(langObj.settingPage.defPage.value.spending)
        $('#offcanvasSetting [name="defPage"] [value="statics"]').text(langObj.settingPage.defPage.value.statics)
        $('#offcanvasSetting [name="defPage"] [value="noted"]').text(langObj.settingPage.defPage.value.noted)
        $('#offcanvasSetting [name="winPosX"]').attr('data-bs-content', langObj.settingPage.winPosX.desc)
        $('#offcanvasSetting [name="winPosX"] strong').text(langObj.settingPage.winPosX.name)
        $('#offcanvasSetting [name="winPosX"] [value="0.35"]').text(langObj.settingPage.winPosX.value.left)
        $('#offcanvasSetting [name="winPosX"] [value="0.5"]').text(langObj.settingPage.winPosX.value.center)
        $('#offcanvasSetting [name="winPosX"] [value="0.65"]').text(langObj.settingPage.winPosX.value.right)
        $('#offcanvasSetting [name="winPosY"]').attr('data-bs-content', langObj.settingPage.winPosY.desc)
        $('#offcanvasSetting [name="winPosY"] strong').text(langObj.settingPage.winPosY.name)
        $('#offcanvasSetting [name="winPosY"] [value="0.8"]').text(langObj.settingPage.winPosY.value.top)
        $('#offcanvasSetting [name="winPosY"] [value="1"]').text(langObj.settingPage.winPosY.value.center)
        $('#offcanvasSetting [name="winPosY"] [value="1.2"]').text(langObj.settingPage.winPosY.value.bottom)
        $('#offcanvasSetting [name="defAction"]').attr('data-bs-content', langObj.settingPage.defAction.desc)
        $('#offcanvasSetting [name="defAction"] strong').text(langObj.settingPage.defAction.name)
        $('#offcanvasSetting [name="defAction"] [value="add"]').text(langObj.settingPage.defAction.value.add)
        $('#offcanvasSetting [name="defAction"] [value="edit"]').text(langObj.settingPage.defAction.value.edit)
        $('#offcanvasSetting [name="defAction"] [value="del"]').text(langObj.settingPage.defAction.value.delete)
        $('#offcanvasSetting [name="language"]').attr('data-bs-content', langObj.settingPage.language.desc)
        $('#offcanvasSetting [name="language"] strong').text(langObj.settingPage.language.name)
        $('#offcanvasSetting [name="language"] [value="en"]').text(langObj.settingPage.language.value.en)
        $('#offcanvasSetting [name="language"] [value="vi"]').text(langObj.settingPage.language.value.vi)
        $('#offcanvasSetting [name="notifyDel"]').attr('data-bs-content', langObj.settingPage.notifyDel.desc)
        $('#offcanvasSetting [name="notifyDel"] strong').text(langObj.settingPage.notifyDel.name)
        $('#offcanvasSetting [name="tooltip"]').attr('data-bs-content', langObj.settingPage.tooltip.desc)
        $('#offcanvasSetting [name="tooltip"] strong').text(langObj.settingPage.tooltip.name)
        $('#offcanvasSetting [name="optionExit"]').attr('data-bs-content', langObj.settingPage.optionExit.desc)
        $('#offcanvasSetting [name="optionExit"] strong').text(langObj.settingPage.optionExit.name)
        $('#offcanvasSetting [name="optionExit"] [value="ask"]').text(langObj.settingPage.optionExit.value.ask)
        $('#offcanvasSetting [name="optionExit"] [value="tray"]').text(langObj.settingPage.optionExit.value.tray)
        $('#offcanvasSetting [name="optionExit"] [value="quit"]').text(langObj.settingPage.optionExit.value.quit)
        $('#offcanvasSetting [name="notification"]').attr('data-bs-content', langObj.settingPage.notification.desc)
        $('#offcanvasSetting [name="notification"] strong').text(langObj.settingPage.notification.name)
        $('#offcanvasSetting [name="startWithWindow"]').attr('data-bs-content', langObj.settingPage.startWithWindow.desc)
        $('#offcanvasSetting [name="startWithWindow"] strong').text(langObj.settingPage.startWithWindow.name)
        $('#offcanvasSetting [name="autoUpdate"]').attr('data-bs-content', langObj.settingPage.autoUpdate.desc)
        $('#offcanvasSetting [name="autoUpdate"] strong').text(langObj.settingPage.autoUpdate.name)
        $('#offcanvasSetting [name="notifyDownload"]').attr('data-bs-content', langObj.settingPage.notifyDownload.desc)
        $('#offcanvasSetting [name="notifyDownload"] strong').text(langObj.settingPage.notifyDownload.name)
        $('#offcanvasSetting [name="backupSync"] [name="desc"]').attr('data-bs-content', langObj.settingPage.formSyncData.desc)
        $('#offcanvasSetting [name="backupSync"] [name="login"]').attr('data-bs-content', langObj.settingPage.formSyncData.button.login_desc)
        $('#offcanvasSetting [name="backupSync"] [name="login"] span').text(langObj.settingPage.formSyncData.button.login)
        $('#offcanvasSetting [name="backupSync"] [name="logout"]').text(langObj.settingPage.formSyncData.button.logout)
        $('#offcanvasSetting [name="backupSync"] #btn-syncData').text(langObj.settingPage.formSyncData.button.syncData)
        $('#offcanvasSetting [name="backupSync"] #btn-syncData').attr('data-bs-content', langObj.settingPage.formSyncData.button.syncData_desc)
        $('#offcanvasSetting [name="backupSync"] #btn-backupData').text(langObj.settingPage.formSyncData.button.backupData)
        $('#offcanvasSetting [name="backupSync"] #btn-backupData').attr('data-bs-content', langObj.settingPage.formSyncData.button.backupData_desc)
        $('#offcanvasSetting [name="backupSync"] [name="email"]').attr('data-bs-content', langObj.settingPage.formSyncData.email)
        $('#offcanvasSetting [name="backupSync"] [name="status"]').text(langObj.settingPage.formSyncData.status.name)
        $('#offcanvasSetting [name="backupSync"] [name="status_desc"]').text(langObj.settingPage.formSyncData.status.desc1)
        $('#offcanvasSetting [name="backupSync"] [name="day"]').text(langObj.settingPage.formSyncData.day)
        $('#offcanvasSetting #ctst_dbPath').attr('data-bs-content', langObj.settingPage.dbPath)
        $('#offcanvasSetting #btn-export_db').attr('data-bs-content', langObj.settingPage.button.export.desc)
        $('#offcanvasSetting #btn-export_db span').text(langObj.settingPage.button.export.name)
        $('#offcanvasSetting #btn-import_db').attr('data-bs-content', langObj.settingPage.button.import.desc)
        $('#offcanvasSetting #btn-import_db span').text(langObj.settingPage.button.import.name)
        $('#offcanvasSetting #btn-reset_setting').attr('data-bs-content', langObj.settingPage.button.reset.desc)
        $('#offcanvasSetting #btn-reset_setting span').text(langObj.settingPage.button.reset.name)
        $('#offcanvasSetting #btn-CheckForUpdate').attr('data-bs-content', langObj.settingPage.button.update.desc)
        $('#offcanvasSetting #btn-CheckForUpdate span').text(langObj.settingPage.button.update.name)
        $('#offcanvasSetting #updateApp-content [name="status"]').text(langObj.settingPage.formUpdate.status.name)
        $('#offcanvasSetting #updateApp-content #updateApp-Status span').text(langObj.settingPage.formUpdate.status.desc1)
        $('#offcanvasSetting [name="app_version"]').text(langObj.settingPage.version)

        //Modal
        $('#modalConfirmDownloadUpdate strong').text(langObj.modal.confirmUpdate.title)
        $('#modalConfirmDownloadUpdate label').text(langObj.modal.confirmUpdate.remember)
        $('#modalConfirmDownloadUpdate [name="close"]').text(langObj.modal.confirmUpdate.button.close)
        $('#modalConfirmDownloadUpdate [name="download"]').text(langObj.modal.confirmUpdate.button.download)
        $('#modalConfirmExit [title1]').text(langObj.modal.confirmExit.title1)
        $('#modalConfirmExit [title2]').text(langObj.modal.confirmExit.title2)
        $('#modalConfirmExit label').text(langObj.modal.confirmExit.remember)
        $('#modalConfirmExit #btnExit').text(langObj.modal.confirmExit.button.close)
        $('#modalConfirmExit #btnTray').text(langObj.modal.confirmExit.button.collapse)
        $('#modalConfirmImport [name="title1"]').text(langObj.modal.confirmImport.title1)
        $('#modalConfirmImport [name="title2"]').text(langObj.modal.confirmImport.title2)
        $('#modalConfirmImport [name="close"]').text(langObj.modal.confirmImport.button.close)
        $('#modalConfirmImport [name="import"]').text(langObj.modal.confirmImport.button.import)
    } catch(e) {
        console.log(e);
        showErrorToast('Không thể tải được ngôn ngữ');
    } finally {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            var popover = bootstrap.Popover.getInstance(popoverTriggerEl);
            if (popover) { popover.dispose();} // Loại bỏ các popovers đã khởi tạo
        });
        tooltipSetting();
    }
}