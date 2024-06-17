import { Response, Request, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config';
import { TUerRole } from '../modules/user/user.interface';
import sendResponse from '../utils/sendResponse';


const auth = (...requiredRoles: TUerRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // "Bearer token"
    const token = req.headers.authorization?.split(" ")[1];
    // Checking is ther token provided
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED,'Oppps! Unauthorized access!')
    }

    // checking is the provided token is valid
    jwt.verify(token,config.jwt_access_secret as string, function(err, decoded){
        
        // if invalid throw error
        if(err){
         return res.status(401).send({
          statusCode: 401,
          success: false,
          message: 'You have no access to this route',
         })
        }
        // retrieve role decoding token
        const role = (decoded as JwtPayload)?.role

        // check retrieved role has access or not
        if(requiredRoles && !requiredRoles.includes(role)){
          return res.status(401).send({
            statusCode: 401,
            success: false,
            message: 'You have no access to this route',
           })  
        }
        
        // all ok -> make user available in req
        req.user = decoded as JwtPayload
        next()
    })

    

  });
};


export default auth