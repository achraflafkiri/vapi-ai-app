import React, { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

const VapiComponent = () => {
    const [vapi, setVapi] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const vapiInstance = new Vapi('7abfc5b1-4695-492e-aecb-c0db750f9b80');
        setVapi(vapiInstance);

        vapiInstance.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        vapiInstance.on('call-start', () => console.log('Call has started'));
        vapiInstance.on('call-end', () => console.log('Call has ended'));

        return () => {
            vapiInstance.stop();
        };
    }, []);

    const startCall = () => {
        vapi.start({
            model: {
                provider: 'openai',
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: 'You are an assistant.' }],
            },
            voice: {
                provider: 'playht', // Ensure this matches the provider in your Vapi configuration
                voiceId: 'jennifer', // Ensure this is a valid voice ID for the provider
            },
        }).catch((error) => {
            console.error('Error starting call:', error);
        });
    };

    const stopCall = () => {
        vapi.stop();
    };

    const toggleMute = () => {
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    };

    return (
        <div>
            <h1>Vapi AI Assistant</h1>
            <button onClick={startCall}>Start Call</button>
            <button onClick={stopCall}>Stop Call</button>
            <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
            <div>
                <h2>Messages</h2>
                <ul>
                    {
                        console.log("messages => ", messages)
                    }
                    {/* {messages.map((msg, index) => (
                        <li key={index}>{msg.content}</li>
                    ))} */}
                </ul>
            </div>
        </div>
    );
};

export default VapiComponent;
