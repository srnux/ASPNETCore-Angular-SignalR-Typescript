import { CanActivate, ComponentInstruction, Router } from 'angular2/router';
import { Injector } from 'angular2/core';
import { appInjector } from '../shared/app.injector';
import { TokenService } from '../services/token.service';
import { SecurityService } from '../services/security.service';

export const NeedsAuthentication = () => {
    return CanActivate((to: ComponentInstruction, from: ComponentInstruction, target = ['/']) => {
        let injector: Injector = appInjector(); // Get the stored reference to the application injector
        let tokenService: TokenService = injector.get(TokenService);
        let securityService: SecurityService = injector.get(SecurityService);
        let router: Router = injector.get(Router);

        if (tokenService.isAuthenticated()) {
            return true;
        }

        //router.navigate(['/Login', { target }]);

        //console.log('Do login logic');
        securityService.Authorize();

        return false;
    });
}