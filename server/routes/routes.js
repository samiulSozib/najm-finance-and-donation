const authRoute=require('./authRoute')
const groupRoute=require('./groupRoute')
const memberRoute=require('./memberRoute')
const eventRoute=require('./eventRoute')
const expenseCategoryRoute=require('./expenceCategoryRoute')
const expenseRoute=require('./expenseRoute')
const paymentRoute=require('./paymentRoute')
const userRoute=require('./userRoute')
const rolePermissionRoute=require('./rolePermissionRoute')
const languageRoute=require('./languageRoute')
const groupTypeRoute=require('./groupTypeRoute')

const routes = [
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/groups',
        handler:groupRoute
    },
    {
        path:'/members',
        handler:memberRoute
    },
    {
        path:'/events',
        handler:eventRoute
    },
    {
        path:'/expense-categories',
        handler:expenseCategoryRoute
    },
    {
        path:'/expenses',
        handler:expenseRoute
    },
    {
        path:'/payments',
        handler:paymentRoute
    },
    {
        path:'/users',
        handler:userRoute
    },
    {
        path:'/role-permission',
        handler:rolePermissionRoute
    },
    {
        path:'/language',
        handler:languageRoute
    },
    {
        path:'/group-types',
        handler:groupTypeRoute
    },
    {
        path: '/',
        handler: (req,res)=>{
            res.send({msg:'Welcome'})
        }
    },
   
]

module.exports = (app) => {
    routes.forEach(r => {
        if (r.path == '/') {
            app.use(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}