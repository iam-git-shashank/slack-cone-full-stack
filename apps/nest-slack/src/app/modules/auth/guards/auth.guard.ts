import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class authGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];

console.log(token,"Dsds")
        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const tokenPayload=await this.jwtService.verifyAsync(token);
            request.user = {
                userId: tokenPayload.sub,
                username:tokenPayload.username
            }
            
            return true
        }
        catch (error) {
            
            console.log("sdds");
            console.log(error)
            throw new UnauthorizedException();
        }



        return true
        
    }
}