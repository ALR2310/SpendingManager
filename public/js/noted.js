var notedEditor;
BalloonEditor
    .create(document.querySelector('#ckeditor_balloon'))
    .then(editor => {
        notedEditor = editor;
    })
    .catch(error => {
        console.error(error);
    });


// Hàm tạo sự kiện đóng/mở trên thanh tìm kiếm + thêm mới
function handleCreateAndSearch() {
    const inputGroupNotedSearch = $('#input-group-notedSearch')
    const inputGroupNotedAdd = $('#input-group-notedAdd')
    const txtNotedSearch = $('#txt-notedSearch')
    const btnNotedSearch = $('#btn-notedSearch')
    const txtNotedAdd = $('#txt-notedAdd')
    const btnNotedAdd = $('#btn-notedAdd')
    var isFormNotedOpen = 0;


    // Nút mở đóng form thêm dữ liệu
    btnNotedAdd.click(function () {
        if (isFormNotedOpen == 0) {
            inputGroupNotedSearch.removeClass('w-auto');
            inputGroupNotedSearch.css('width', '38.674px');

            setTimeout(() => {
                txtNotedSearch.addClass('d-none');
                btnNotedSearch.addClass('border-top-bottom-left-radius')
            }, 250);


            inputGroupNotedAdd.removeClass('w-auto');
            inputGroupNotedAdd.css('width', '218.491px');

            txtNotedAdd.removeClass('d-none');
            $(this).removeClass('border-top-bottom-left-radius')
            isFormNotedOpen = 1;
        } else {
            const data = {
                Token: JSON.parse(localStorage.getItem('AuthToken')).token,
                NameList: $('#txt-notedAdd').val() || 'Ghi chú của tôi',
            }

            $.ajax({
                type: 'POST',
                url: urlapi + '/noted/insertNoted',
                data: data,
                dataType: 'json',
                contentype: 'application/json',
                success: function (res) {
                    if (res.success) {
                        handleShowListNoted();
                        showSuccessToast('Đã thêm danh sách thành công');
                    } else {
                        showErrorToast('Có lỗi khi thêm danh sách');
                    }

                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    });

    // Nút mở đóng form tìm kiếm
    btnNotedSearch.click(function () {
        if (isFormNotedOpen == 1) {
            inputGroupNotedAdd.css('width', '38.674px');
            inputGroupNotedSearch.css('width', '218.491px');

            setTimeout(() => {
                txtNotedAdd.addClass('d-none');
                txtNotedSearch.removeClass('d-none');
                btnNotedAdd.addClass('border-top-bottom-left-radius')
                $(this).removeClass('border-top-bottom-left-radius')
                inputGroupNotedAdd.addClass('w-auto')
            }, 280);

            isFormNotedOpen = 0;
        } else {
            $.ajax({
                type: 'GET',
                url: urlapi + '/noted/searchNoted',
                data: {
                    token: JSON.parse(localStorage.getItem('AuthToken')).token,
                    searchKey: $('#txt-notedSearch').val()
                },
                success: function (res) {
                    res.notedlist.forEach((item) => {
                        item.atcreate = formatDate(item.atcreate)
                        item.atupdate = formatDate(item.atupdate)
                    });

                    const source = $('#template-list-noted').html();
                    const convertSource = convertPlaceHbs(source);
                    const template = Handlebars.compile(convertSource);
                    const data = template({ notedList: res.notedlist });

                    $('#list-noted').html(data);
                    // Gọi hàm để gán lại các sự kiện cho các nút
                    handleAssignEvents()
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    });
} handleCreateAndSearch();


// Các hàm liên quan đến việc đóng/mở form sửa-xoá
var currentOpenId = null;
function openActionForm(dataId) {
    if (currentOpenId === null) {
        // Nếu không có form nào đang mở, mở form hiện tại
        currentOpenId = dataId;
        toggleButtons(dataId, true);
        toggleIconButtons(dataId, true);
    } else if (currentOpenId === dataId) {
        // Nếu form hiện tại đang mở, đóng nó lại
        currentOpenId = null;
        toggleButtons(dataId, false);
        toggleIconButtons(dataId, false);
    } else {
        // Nếu form khác đang mở, đóng nó và mở for mới
        currentOpenId = dataId;
        toggleButtons(dataId, true);
        toggleIconButtons(dataId, true);
    }
}
function toggleButtons(dataId, isOpen) {
    var notedContentAction = $('.noted-content_action');
    notedContentAction.each(function () {
        var $element = $(this);

        if ($element.data('id') == dataId) {
            if (isOpen) {
                $element.css('animation', 'slide-right-show 0.5s ease forwards');
                $element.css('display', 'flex');
            } else {
                $element.css('animation', 'slide-right-hidden 0.5s ease forwards');
                setTimeout(function () {
                    $element.css('display', 'none');
                }, 200);
            }
        } else {
            $element.css('animation', 'slide-right-hidden 0.5s ease forwards');
            setTimeout(function () {
                $element.css('display', 'none');
            }, 200);
        }
    });
}
function toggleIconButtons(dataId, isOpen) {
    var notedIconBtn = $('.btn-noted-toggle-action')
    notedIconBtn.each(function () {
        var $element = $(this);

        if ($element.data('id') == dataId) {
            if (isOpen) {
                $element.find('i').removeClass('fa-angle-left').addClass('fa-angle-right')
            } else {
                $element.find('i').addClass('fa-angle-left').removeClass('fa-angle-right')
            }
        } else {
            $element.find('i').addClass('fa-angle-left').removeClass('fa-angle-right')
        }
    })
}

// Hàm xử lý việc hiển thị danh sách noted
function handleShowListNoted() {
    $.ajax({
        type: 'GET',
        url: urlapi + '/noted/getData',
        data: {
            token: JSON.parse(localStorage.getItem('AuthToken')).token
        },
        success: function (res) {
            res.notedlist.forEach((item) => {
                item.atcreate = formatDate(item.atcreate)
                item.atupdate = formatDate(item.atupdate)
            });

            const source = $('#template-list-noted').html();
            const convertSource = convertPlaceHbs(source);
            const template = Handlebars.compile(convertSource);
            const data = template({ notedList: res.notedlist });

            $('#list-noted').html(data);
            // Gọi hàm để gán lại các sự kiện cho các nút
            handleAssignEvents()
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// Hàm mở chế độ edit
function openEditForm(dataId, isOpen) {
    const formData = $('.list-group-item.pointer.p-0');
    formData.each(function () {
        if ($(this).data('id') == dataId) {
            if (isOpen) {
                $(this).find('.txt-notedname').addClass('d-none')
                $(this).find('.tbl-notedname').removeClass('d-none')
            } else {
                $(this).find('.txt-notedname').removeClass('d-none')
                $(this).find('.tbl-notedname').addClass('d-none')
            }
        } else {
            $(this).find('.txt-notedname').removeClass('d-none')
            $(this).find('.tbl-notedname').addClass('d-none')
        }
    });
    if (isOpen) {
        $('#noted-content').addClass('d-none');
        $('#noted-content_editor').removeClass('d-none');
    } else {
        $('#noted-content').removeClass('d-none');
        $('#noted-content_editor').addClass('d-none');
    }
}

// Hàm gán các sự kiện cho element
function handleAssignEvents() {
    // Nút đóng/mở form sửa-xoá
    $('.btn-noted-toggle-action').click(function (event) {
        var dataId = $(this).data('id');
        openActionForm(dataId, true)
    });

    // Nút lấy nội dung trên danh sách
    $('.list-group-item.pointer.p-0').click(function () {
        $.ajax({
            type: 'GET',
            url: urlapi + '/noted/getContent',
            data: {
                notedId: this.getAttribute('data-id')
            },
            success: function (res) {
                if (res.success) {
                    $('#noted-content').html(res.data[0].content);
                    notedEditor.setData(res.data[0].content);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    // Nút mở form sửa dữ liệu trên danh sách
    $('.btn-notedEdit').click(function (event) {
        event.stopPropagation();
        var listItem = event.target.closest('a');
        if (listItem) {
            var notedId = listItem.getAttribute('data-id');

            openEditForm(notedId, true);

            console.log(currentOpenId);
        }
    });

    // Nút xoá dữ liệu trên danh sách
    $('.btn-notedDelete').click(function (event) {
        event.stopPropagation();
        var listItem = event.target.closest('a');
        if (listItem) {
            var notedId = listItem.getAttribute('data-id');

            $.ajax({
                type: 'POST',
                url: urlapi + '/noted/deleteNoted',
                data: { IdNoted: notedId },
                dataType: 'json',
                contentype: 'application/json',
                success: function (res) {
                    if (res.success) {
                        showSuccessToast(res.message)
                        handleShowListNoted(); // Gọi hàm để hiển thị lại danh sách
                    } else {
                        showErrorToast(res.message);
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    });

    // Nút huỷ thay đổi
    $('#btn-noted-close').click(function () {
        openActionForm(currentOpenId, false) // đóng form sửa/xoá
        openEditForm(currentOpenId, false) //đóng chế độ sửa
    });

    // Nút lưu thay đổi
    $('#btn-noted-save').click(function () {
        const data = {
            notedId: currentOpenId,
            nameList: $('.tbl-notedname').val(),
            content: notedEditor.getData(),
        }

        $.ajax({
            type: 'POST',
            url: urlapi + '/noted/updateNoted',
            data: data,
            dataType: 'json',
            contentype: 'application/json',
            success: function (res) {
                if (res.success) {
                    showSuccessToast(res.message)
                    // cập nhật nội dung mới
                    $('#noted-content').html(notedEditor.getData());

                    openActionForm(currentOpenId, false) // đóng form sửa/xoá
                    openEditForm(currentOpenId, false) //đóng chế độ sửa
                } else {
                    showErrorToast(res.message);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    });
}

// Gọi hàm để gán các sự kiện click cho element
handleAssignEvents();