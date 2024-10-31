import { getSession } from "next-auth/react";

// Define the withAuth higher-order function
export function withAuth<T extends (...args: any[]) => Promise<any>>(action: T) {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // // Check if the user is authenticated
    // const session = await getSession();

    // if (!session) {
    //   throw new Error("Unauthorized");
    // }

    // Call the original server action with the provided arguments
    return await action(...args);
  };
}

