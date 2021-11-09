const publicContent = (req,res) => {
    res.status(200).send('Publicly available content.');
}

const userContent = (req,res) => {
    res.status(200).send('Available for authorized user.');
}

const adminContent = (req,res) => {
    res.status(200).send('Available for admin only.');
}

module.exports = {
    publicContent,
    userContent,
    adminContent
}