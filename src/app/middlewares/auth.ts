import { Response, Request, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload, decode } from 'jsonwebtoken'
import config from '../config';
import { TUerRole } from '../modules/user/user.interface';


const auth = (...requiredRoles: TUerRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Checking is ther token provided
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED,'Oppps! Unauthorized access!')
    }

    // checking is the provided token is valid
    jwt.verify(token,config.jwt_access_secret as string, function(err, decoded){
        
        // if invalid throw error
        if(err){
            throw new AppError(httpStatus.UNAUTHORIZED,'Opps! authorized access')
        }
        // retrieve role decoding token
        const role = (decoded as JwtPayload)?.role

        // check retrieved role has access or not
        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.UNAUTHORIZED,'Opps! authorized access')
        }
        
        // all ok -> make user available in req
        req.user = decode as JwtPayload
        next()
    })

    

  });
};


export default auth