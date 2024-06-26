const db = require('../../configs/db');
const logger = require('../../configs/logger');



module.exports = {
    getData: async (req, res) => {
        try {
            let sql = 'select * from spendinglist';
            const spendingList = await db.query(sql);
            return res.json({ success: true, status: 200, message: "Lấy dữ liệu thành công", data: { spendingList: spendingList } });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    },

    insertSpendingList: async (req, res) => {
        try {
            const { namelist, atcreate, status } = req.body;

            let sql = 'insert into spendinglist (namelist, atcreate, status) values (?, ?, ?)';
            await db.query(sql, [namelist, atcreate, status]);
            return res.json({ success: true, status: 201, message: 'Thêm danh sách thành công' });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    },

    getSpendingForSpendList: async (req, res) => {
        try {
            const { IdList, tblOffset, tbLimit, SearchKey, SearchDate, TypeSearchDate } = req.query;

            if (!IdList || isNaN(IdList))
                return res.json({ success: false, status: 400, message: 'Dữ liệu yêu cầu không hợp lệ' });

            let sql = 'SELECT * FROM spendingitem WHERE spendlistid = ? AND status = 1';
            let params = [IdList];

            // Kiểm tra xem có tìm kiếm theo thời gian không
            if (SearchDate) {
                sql += ' AND strftime(?, AtUpdate) = ?';
                params.push(TypeSearchDate === 'date' ? '%Y-%m-%d' : '%Y-%m');
                params.push(SearchDate);
            }

            // Kiểm tra xem có từ khoá tìm kiếm không
            if (SearchKey) {
                const searchQuery = `(NameItem LIKE ? OR Details LIKE ? OR Price LIKE ? OR Id LIKE ?)`;
                sql += ` AND ${searchQuery}`;
                params.push(`%${SearchKey}%`, `%${SearchKey}%`, `%${SearchKey}%`, `%${SearchKey}%`);

                // Sắp xếp theo NameItem trước, sau đó mới đến AtUpdate và Id
                sql += ' ORDER BY NameItem ASC, AtUpdate DESC, Id DESC';
            } else {
                // Sắp xếp mặc định theo AtUpdate và Id
                sql += ' ORDER BY AtUpdate DESC, Id DESC';
            }

            // Giới hạn dữ liệu lấy và hiển thị
            sql += ' LIMIT ? OFFSET ?';
            params.push(tbLimit, tblOffset);

            const dataResult = await db.query(sql, params);

            return res.json({ success: true, status: 200, message: "Lấy dữ liệu thành công", data: dataResult });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    },

    getListNameSpending: async (req, res) => {
        try {
            var sql = 'SELECT NameItem FROM SpendingItem Where Status = 1 Order By NameItem';
            const result = await db.query(sql);
            // Xử lý kết quả để lấy danh sách các tên
            const names = result.map(item => item.nameitem);
            return res.json({ success: true, status: 200, message: "Lấy dữ liệu thành công", data: names });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    },

    insertSpending: async (req, res) => {
        try {
            const { ListId, Name, Price, Details, AtCreate, AtUpdate, Status } = req.body;

            if (!ListId || isNaN(ListId))
                return res.json({ success: false, status: 400, message: 'Dữ liệu yêu cầu không hợp lệ' });

            // Thêm dữ liệu vào bảng spendingitem
            let sql = 'insert into spendingitem (spendlistid, nameitem, price, details, atcreate, atupdate, status) values (?, ?, ?, ?, ?, ?, ?)';
            let params = [ListId, Name, Price, Details, AtCreate, AtUpdate, Status];
            await db.query(sql, params);

            // Lấy ra id của bản ghi vừa thêm
            const lastId = await db.lastInsertId();

            // Cập nhật thời gian của spendlist
            sql = 'update spendinglist set lastentry = ? where id = ?';
            await db.query(sql, [AtUpdate, ListId]);

            // Lấy ra dữ liệu vừa insert
            sql = 'select * from spendingitem where id = ?'
            const lastDataResult = await db.query(sql, [lastId]);
            return res.json({ success: true, status: 201, data: lastDataResult, message: 'Thêm chi tiêu thành công' });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    },

    updateSpending: async (req, res) => {
        try {
            const { Id, ListId, Name, Price, Details, AtUpdate } = req.body;

            if (!Id || isNaN(Id) || !ListId || isNaN(ListId))
                return res.json({ success: false, status: 400, message: 'Dữ liệu yêu cầu không hợp lệ' });

            let sql = "update spendingitem set spendlistid = ?, nameitem = ?, price = ?, details = ?, atupdate = ? where id = ?";
            let params = [ListId, Name, Price, Details, AtUpdate, Id];
            await db.query(sql, params);
            return res.json({ success: true, status: 200, message: 'Cập nhật chi tiêu thành công' });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' })
        }
    },

    deleteSpending: async (req, res) => {
        try {
            const { Id } = req.body;

            if (!Id || isNaN(Id))
                return res.json({ success: false, status: 400, message: 'Dữ liệu yêu cầu không hợp lệ' });

            await db.query('delete from spendingitem where id = ?', [Id]);
            return res.json({ success: true, status: 200, message: 'Xoá chi tiêu thành công' });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' })
        }
    },

    calculateTotalPrice: async (req, res) => {
        try {
            const { listId } = req.query;

            let sql = 'SELECT SUM(Price) AS TotalPrice FROM SpendingItem WHERE SpendListId = ? AND Status = 1';
            const result = await db.query(sql, [listId]);
            return res.json({
                success: true, status: 200, message: "Lấy dữ liệu thành công", data: { totalPrice: result[0].totalprice }
            });
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    },

    calculateItemPrice: async (req, res) => {
        try {
            const { SpendName, listId } = req.query;

            if (!SpendName)
                return res.json({ success: false, status: 400, message: 'Dữ liệu yêu cầu không hợp lệ' });

            let sql = 'select count(*) as count from spendingitem where SpendListId = ? and NameItem = ? and status = 1';
            const countResult = await db.query(sql, [listId, SpendName]);

            sql = 'select sum(Price) as totalprice from spendingitem where SpendListId = ? and NameItem = ? and status = 1';
            const priceResult = await db.query(sql, [listId, SpendName]);
            return res.json({
                success: true, status: 200, message: "Lấy dữ liệu thành công", data: {
                    count: countResult[0].count,
                    price: priceResult[0].totalprice
                }
            })
        } catch (err) {
            logger.error(err);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    },

    getSpendViews: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id || isNaN(id))
                return res.json({ success: false, status: 400, message: 'Dữ liệu yêu cầu không hợp lệ' })

            let sql = 'select * from spendingitem where id = ? and status = 1';
            const result = await db.query(sql, [id])

            sql = 'select namelist from spendinglist where id = ?';
            const nameList = await db.query(sql, [result[0].spendlistid]);

            return res.json({ success: true, status: 200, message: 'Lấy dữ liệu thành công', data: { ...result[0], ...nameList[0] } })
        } catch (e) {
            logger.error(e);
            return res.json({ success: false, status: 500, message: 'Lỗi máy chủ nội bộ' });
        }
    }
}