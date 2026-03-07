import { useEffect, useState, type ReactNode } from 'react';
import styles from './styles.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    atualModal: "data" | "payment" | "completed" | null;
}

export default function Modal({ children, onClose, atualModal}: ModalProps) {

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };

    }, []);


    return createPortal(
        
        <div className={styles.overlay} onClick={atualModal === "data" ? onClose : undefined}>
        
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                
                {children}
            
            </div>
        
        </div>,
        
        document.body
    );
}