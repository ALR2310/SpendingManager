const db = require('../../configs/db')
const myUtils = require('../../configs/myUtils')
const logger = require('../../configs/logger')



module.exports = {
    getData: async (req, res) => {
        const { spendList } = req.query;

        try {
            // Lấy tổng tiền ngày hôm nay
            let sql = 'SELECT SUM(price) AS total FROM spendingitem WHERE DATE(atupdate) = DATE(?) AND SpendListId = ? AND status = 1';
            const todayResult = await db.query(sql, ['now', spendList]);

            // Lấy tổng tiền ngày trước đó
            sql = 'SELECT SUM(price) AS total FROM spendingitem WHERE DATE(atupdate) = DATE(?, ?) AND SpendListId = ? AND status = 1';
            const yesterdayResult = await db.query(sql, ['now', '-1 day', spendList]);

            // Lấy tổng tiền tuần hiện tại
            sql = 'SELECT SUM(price) AS total FROM spendingitem WHERE strftime(?, atupdate) = strftime(?, ?) AND SpendListId = ? AND status = 1';
            const thisWeekResult = await db.query(sql, ['%Y-%W', '%Y-%W', 'now', spendList]);

            // Lấy tổng tiền tuần trước đó
            sql = 'SELECT SUM(price) AS total FROM spendingitem WHERE strftime(?, atupdate) = strftime(?, DATE(?, ?)) AND SpendListId = ? AND status = 1';
            const lastWeekResult = await db.query(sql, ['%Y-%W', '%Y-%W', 'now', '-7 days', spendList]);

            // Lấy tổng tiền mỗi khoản chi
            sql = 'SELECT NameItem, SUM(Price) AS TotalPrice FROM SpendingItem WHERE SpendListId = ? AND Status = 1 GROUP BY NameItem ORDER BY TotalPrice DESC';
            const totalPerSpendItem = await db.query(sql, [spendList]);

            // Lấy tổng các khoản chi
            sql = 'SELECT COUNT(DISTINCT NameItem) AS Total FROM SpendingItem WHERE SpendListId = ? AND Status = 1';
            const totalSpendItem = await db.query(sql, [spendList]);

            // Lấy tổng ngày chi
            sql = 'SELECT COUNT(DISTINCT AtUpdate) AS Total FROM SpendingItem WHERE SpendListId = ? AND Status = 1';
            const totalDate = await db.query(sql, [spendList]);

            // Lấy tổng tiền chi
            sql = 'SELECT SUM(Price) AS Total FROM SpendingItem WHERE SpendListId = ? AND Status = 1';
            const totalPrice = await db.query(sql, [spendList]);

            // Lấy các năm
            sql = `SELECT strftime(?, AtUpdate) AS Year FROM SpendingItem WHERE SpendListId = 1 
                AND Status = 1 GROUP BY strftime(?, AtUpdate) ORDER BY strftime(?, AtUpdate) DESC;`
            const yearList = await db.query(sql, ['%Y', '%Y', '%Y']);

            res.json({
                success: true,
                message: 'Lấy dữ liệu thành công',
                today: todayResult[0].total, // Tổng tiền ngày hôm nay
                yesterday: yesterdayResult[0].total, // Tổng tiền ngày hôm qua
                thisWeek: thisWeekResult[0].total, // Tổng tiền tuần hiện tại
                lastWeek: lastWeekResult[0].total, // Tổng tiền tuần trước

                totalPerSpendItem: totalPerSpendItem, // Tổng tiền mỗi khoán chi

                totalSpendItem: totalSpendItem[0].total, // Tổng các khoản chi
                totalDate: totalDate[0].total, // Tổng ngày chi
                totalPrice: totalPrice[0].total, // Tổng tiền chi

                yearList: yearList, // Lấy các năm
            })
        } catch (error) {
            res.json({ success: false, message: 'Lấy dữ liệu thất bại', })
            logger.error(error);
        }
    },

    getDataForChart1: async (req, res) => {
        try {
            const { spendListId } = req.query;

            // Lấy tổng tiền mỗi ngày
            let sql = 'SELECT DATE(AtUpdate) AS Date, SUM(Price) AS Total FROM SpendingItem WHERE SpendListId = ? AND Status = 1 GROUP BY DATE(AtUpdate) ORDER BY Date DESC';
            const totalPerDay = await db.query(sql, [spendListId]);

            // Lấy tổng tiền mỗi tuần
            sql = 'SELECT strftime(?, atupdate) AS week, SUM(price) AS total FROM spendingitem WHERE SpendListId = ? AND status = 1 GROUP BY week ORDER BY week DESC';
            const totalPerWeek = await db.query(sql, ['%Y-%W', spendListId]);

            // Lấy tổng tiền mỗi tháng
            sql = 'SELECT strftime(?, atupdate) AS Month, SUM(price) AS Total FROM spendingitem WHERE SpendListId = ? AND status = 1 GROUP BY Month ORDER BY Month DESC';
            const totalPerMonth = await db.query(sql, ['%Y-%m', spendListId]);

            // Lấy tổng tiền mỗi năm
            sql = 'SELECT strftime(?, atupdate) AS year, SUM(price) AS total FROM spendingitem WHERE SpendListId = ? AND status = 1 GROUP BY year ORDER BY year DESC';
            const totalPerYear = await db.query(sql, ['%Y', spendListId]);

            if (totalPerDay && totalPerWeek && totalPerMonth && totalPerYear) {
                res.json({
                    success: true,
                    message: 'Lấy dữ liệu thành công',
                    totalPerDay: totalPerDay,
                    totalPerWeek: totalPerWeek,
                    totalPerMonth: totalPerMonth,
                    totalPerYear: totalPerYear
                })
            } else {
                res.json({ success: false, message: 'Lấy dữ liệu thất bại' })
            }
        } catch (e) {
            logger.error(e)
            res.json({ success: false, message: 'Có lỗi khi lấy dữ liệu' })
        }
    },

    getDataForChart2: async (req, res) => {
        const { type, value, SpendListId } = req.query;

        try {
            var sql, param;
            let resultData;

            if (value == '' || value == undefined) {
                sql = `SELECT NameItem, SUM(Price) AS TotalPrice FROM SpendingItem WHERE SpendListId = ? AND Status = 1 
                    GROUP BY NameItem ORDER BY TotalPrice DESC`;
                const result = await db.query(sql, [SpendListId])
                resultData = result;
            } else {
                sql = `SELECT NameItem, SUM(Price) AS TotalPrice FROM SpendingItem WHERE SpendListId = ? AND Status = 1 
                    AND strftime(?, AtUpdate) = ? GROUP BY NameItem ORDER BY TotalPrice DESC`;

                if (type === 'date') {
                    param = [SpendListId, '%Y-%m-%d', value];
                } else if (type === 'month') {
                    param = [SpendListId, '%Y-%m', value];
                } else {
                    param = [SpendListId, '%Y', value];
                }

                const result = await db.query(sql, param)
                resultData = result;
            }

            res.json({
                success: true,
                data: resultData
            })
        } catch (err) {
            logger.error(err);
        }
    },
}