// importa o componente que controla a navegação (rotas)
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
            name="index"
            options={{
                title: 'Only Money',
            }}
            />
        </Stack>
    );


}