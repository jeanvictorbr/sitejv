import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

interface UserData {
  display_name: string;
  email: string;
  plan: string;
  bots: string[];
}

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manageUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Tenta buscar os dados do usuário
        let { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        // Se não encontrou (erro PGRST116), cria o usuário
        if (error && error.code === 'PGRST116') {
          const newUser = {
            id: user.id,
            email: user.email,
            display_name: user.user_metadata.name || user.email,
            plan: 'Gratuito',
            bots: [],
          };
          
          const { error: insertError } = await supabase.from('users').insert(newUser);
          if (insertError) throw insertError;

          // Define os dados do novo usuário para a interface
          setUserData(newUser as UserData);
        } else if (error) {
          throw error;
        } else {
          // Se encontrou, define os dados
          setUserData(data);
        }
      } catch (error) {
        console.error("Erro ao gerenciar dados do usuário:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    manageUserData();
  }, [user]);

  return { userData, loading };
};