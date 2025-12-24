const isLoggedIn = (req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","User not logged in.");
        return res.redirect("/users/login");
    }
    next();
}
const saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; 
    }
    next();
};

module.exports = {isLoggedIn , saveRedirectUrl};