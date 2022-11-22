import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import React,{useState  } from 'react';
import UserModal from './UserModal';
import { Modal } from '@mantine/core';

const Usercard = ({data, modalState, setModalState}) => {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section component="a" href="https://mantine.dev/">
            <Image
              src={data.avatar}
              height={160}
              width={160}
              alt="Norway"
            />
          </Card.Section>
    
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{data.first_name + " " + data.last_name}</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>
    
          <Text size="sm" color="dimmed">
            {data.email}
          </Text>
          {/* <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="UserDetail"
          >
          </Modal> */}
          <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={()=>{setModalState(true)}}>
                Click Here TO get UserDetial
          </Button>
        </Card>
      );
}

export default Usercard