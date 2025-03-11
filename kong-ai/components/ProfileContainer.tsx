"use client";

import { ChallengePreferences } from '@prisma/client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import DifficultyCard from './DifficultyCard';

const difficulties = [
    {
      id: "EASY",
      level: "Easy",
      description:
        "This challenge level is for people who are new to programming. Receive 3 challenges per day (7:30AM, 12PM, & 5:30PM EST).",
    },
    {
      id: "MEDIUM",
      level: "Medium",
      description:
        "This challenge level is for people who are familiar with programming. Receive 4 challenges per day (7AM, 12PM, 5PM, & 8PM EST).",
    },
    {
      id: "HARD",
      level: "Hard",
      description:
        "This challenge level is for people who are experienced with programming. Receive 5 challenges per day (6AM, 9AM, 12PM, 5PM, & 8PM EST).",
    },
  ];

  type Difficulties = "EASY" | "MEDIUM" | "HARD";

interface ProfileContainerProps {
    challengePreferences: ChallengePreferences
}

function ProfileContainer({ challengePreferences }: ProfileContainerProps) {

    const [sendNotiications, setSendNotifications] = useState(challengePreferences.sendNotifications)
    const [selectedDifficulty, setSelectedDifficulty] = useState(challengePreferences.challengeId)

    const handleToggleNotifications = () => {

    }

    const handleSelectDifficulty = (difficultyId: Difficulties) => {

    }

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
            <Switch checked={sendNotiications}  onCheckedChange={handleToggleNotifications} />
        </div>
        <div className="grid grid-col-1 md:grid-cols-3 gap-4">
        {difficulties.map((difficulty) => (
          <DifficultyCard
            key={difficulty.id}
            level={difficulty.level}
            description={difficulty.description}
            selected={difficulty.id === selectedDifficulty}
            onSelect={() =>
              handleSelectDifficulty(difficulty.id as Difficulties)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileContainer