import { useState, useRef, useEffect } from 'react';
import { Paper, Text, TextInput, ScrollArea, Group, ThemeIcon, Loader, CloseButton, ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { useTextScramble } from '../hooks/useTextScramble';
import classes from './ChatPage.module.css';
import { Link } from 'react-router-dom';

// --- Ícones SVG ---
const IconSparkles = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9Z" /></svg> );
const IconSend = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1-1 0l-3.5-
