import { NextApiHandler } from 'next';

interface userInfo {
    id: string;
    password: string;
}

interface LoginSuccess {
    accept: 'success';
    token?: string;
}

interface LoginFail {
    accept: 'fail';
    message?: string;
}

type ILoginInfo = LoginSuccess | LoginFail;


const handler: NextApiHandler<ILoginInfo> = (req, res) => {
    if(req.method==='GET')
    {
        res.redirect('/login');
    }
    else {
        const json: userInfo = JSON.parse(req.body);
        if (json && json.id && json.password) {
            // something 
            return res.status(200).json({
                accept: 'success',
                token: 'abcdefg'
            })
        }
        else {
            return res.status(401).json({
                accept:'fail',
                message:'fail to login'
            })
        }
    }
};

export default handler;