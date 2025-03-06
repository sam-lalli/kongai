import { ChallengePreferences } from '@prisma/client'
import React from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'

interface ProfileContainerProps {
    challengePreferences: ChallengePreferences
}

function ProfileContainer({ challengePreferences }: ProfileContainerProps) {

  return (
    <div className='flex flex-col'>
        <div className="flex flex row justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Challenge Level</h1>
            <Button>Save</Button>
        </div>
        <div className="flex flex-row items-center justify-between mb-4 p-4 shadow rounded-lg">
            <div>
                <h3 className="font-medium text-lg text-gray-900">
                    Push Notifications
                </h3>
                <p>Receive push notifications when new challenges are available.</p>
            </div>
            <Switch></Switch>
        </div>
        <div>
            {/* Map difficulties */}
        </div>
    </div>
  )
}

export default ProfileContainer