

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationServiceService } from '../servicios/authentication-service.service';

export const authGuard: CanActivateFn = (route, state) => {

  const guard = inject(AuthenticationServiceService)
  const router = inject(Router)
 // return guard.isUserLoggedIn();
  if(guard.isUserLoggedIn()){
   return true;
  }else{

    const urlTreeReturn = router.createUrlTree(['/login'])

    return urlTreeReturn;
    //return false
  }

  
 
}

