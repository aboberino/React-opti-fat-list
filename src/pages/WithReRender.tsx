import { faker } from '@faker-js/faker'
import { Avatar, Button, Card, CardHeader, Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'

type User = {
    id: string
    username: string
    email: string
    avatar: string
    password: string
    birthdate: Date
    registeredAt: Date
    isActive: boolean
    isLate: boolean
}

export default function WithReRender() {

    console.log('re render')

    const [users, setUsers] = useState(Array.from({ length: 1000 }).map(() => createRandomUser()))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, userId: string, property: 'isActive' | 'isLate') => {
        console.log('handleChange')
        let usersCopy = [...users]
        const userIndex = usersCopy.findIndex(user => user.id === userId)
        usersCopy[userIndex][property] = e.target.checked
        setUsers(usersCopy)
    }

    function handleOnClick() {
        console.log(users)
    }

    return (
        <div className='Home'>
            <Button variant='contained' color='primary' size='large' onClick={handleOnClick}>Save</Button>
            {users.map(user => <UserCard key={user.id} user={user} handleChange={handleChange} />)}
        </div>
    )
}


function UserCard({ user, handleChange }: {
    user: User,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, userId: string, property: 'isActive' | 'isLate') => void
}) {
    return (
        <Card sx={{ maxWidth: 500, width: 420 }} key={user.id}>
            <CardHeader
                avatar={<Avatar src={user.avatar} aria-label="recipe" />}
                action={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                            control={<Checkbox checked={user.isActive} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, user.id, 'isActive')} />}
                            label="Enable"
                            labelPlacement='start'
                        />
                        <FormControlLabel
                            control={<Checkbox checked={user.isLate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, user.id, 'isLate')} />}
                            label="Late"
                            labelPlacement='start'
                        />
                    </div>
                }
                title={user.username}
                subheader={user.email}
            />
        </Card>
    )
}

function createRandomUser(): User {
    return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: 'https://picsum.photos/200', //faker.image.avatar()
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
        isActive: Math.random() > 0.5,
        isLate: false
    }
}