"use client"
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import {

  useUser,
} from "@thirdweb-dev/react";

export const useProtectedRoute = (onlyForAdmin:boolean = false) => {
    const router = useRouter();
   const { user, isLoggedIn } = useUser();
    console.log(user)

    useLayoutEffect(() => {
        if (user !== undefined) {
               if (!isLoggedIn ) {
            router.push('/');
        }
        if (onlyForAdmin) {
            if (user?.address != process.env.ADMIN_USER_ADDRESS) {
                console.log('user is not admin',user?.address,process.env.ADMIN_USER_ADDRESS)
                router.push('/');
            }
        }
        }
     
    }, [isLoggedIn, user]);

    return isLoggedIn;
};
