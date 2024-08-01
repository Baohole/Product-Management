module.exports.validateTitle = (req, res, next) => {
    const [title] = req.body.title;
    console.log(title);
    if(!title){
        req.flash('error','Vui lòng nhập tiêu đề')
        res.redirect('back');
        return;
    }

    next();
    
}