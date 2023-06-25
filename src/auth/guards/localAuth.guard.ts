import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { 
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // verify email and password
        await super.canActivate(context);
        
        // session initialize 
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
     
        // allow access to route
        return true;
      } 
} 
 