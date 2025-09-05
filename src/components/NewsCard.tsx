import { Card, Image, Text, Group, Badge } from '@mantine/core';
import classes from './NewsCard.module.css';
import { HackerPlaceholder } from './HackerPlaceholder';

const IconCalendar = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg> );

// ...
export function NewsCard({ id, title, content, imageUrl, createdAt }: NewsCardProps) {
  return (
    <Card shadow="xl" padding={0} radius="md" withBorder className={classes.card}>
      <Card.Section className={classes.imageSection}>
        {/* A imagem será mostrada se existir, caso contrário, o placeholder hacker. */}
        {imageUrl ? (
          <Image src={imageUrl} alt={title} className={classes.image} height={220} fit="cover" />
        ) : (
          <HackerPlaceholder />
        )}
      </Card.Section>
      <div className={classes.contentWrapper}>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700} className={classes.title} lineClamp={1}>{title}</Text>
          <Badge color="gray" leftSection={<IconCalendar size={12} />} className={classes.dateBadge}>
            {new Date(createdAt).toLocaleDateString()}
          </Badge>
        </Group>
        <Text size="sm" c="dimmed" lineClamp={3} className={classes.description}>{content}</Text>
      </div>
    </Card>
  );
}
