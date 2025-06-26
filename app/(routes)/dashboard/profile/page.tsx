"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Profile() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }
  if(user == null) return <div>Not logged in</div>
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg dark:bg-gray-800 dark:text-white">
        <CardContent className="flex flex-col items-center gap-4">
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-semibold">{user.fullName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.emailAddresses[0]?.emailAddress}
          </p>

          <div className="w-full mt-6">
            <h3 className="text-lg font-medium mb-2">Account Details</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>User ID:</strong> {user.id}
              </li>
              <li>
                <strong>Username:</strong> {user.username || "Not set"}
              </li>
              <li>
                <strong>Created At:</strong>{" "}
                {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
