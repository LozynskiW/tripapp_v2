exports.getCookieStoredData = async (req, res) => {

    try {

        res.status(200).json(res.cookies[security])

    } catch (err) {
        res.status(404).json({
            message: "No data or no cookie"
        })
    }
}