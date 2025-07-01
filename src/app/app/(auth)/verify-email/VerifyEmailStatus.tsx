'use client';

import React from 'react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
// You'll need to place your Lottie JSON files in the public folder or import them directly
// For this example, let's assume they are in public/animations/
// import successAnimation from '../../../../public/animations/success-animation.json';
// import errorAnimation from '../../../../public/animations/error-animation.json';

interface VerifyEmailStatusProps {
  success: boolean;
  message: string;
}

// Placeholder animation data (replace with your actual Lottie JSON imports or paths)
const placeholderSuccessAnimation = {
    v: '5.5.7',
    fr: 30,
    ip: 0,
    op: 30,
    w: 200,
    h: 200,
    nm: 'Success',
    ddd: 0,
    assets: [],
    layers: [
        {
            ty: 4,
            ks: {
                o: {a: 0, k: 100},
                s: {a: 0, k: [100, 100]},
                p: {a: 0, k: [100, 100]},
                a: {a: 0, k: [0,0]}
            },
            shapes: [
                {
                    ty: 'gr',
                    it: [
                        {
                            ty: 'el',
                            d: 1,
                            s: {a:0, k:[180, 180]},
                            p: {a:0, k:[0,0]},
                            nm: 'Ellipse Path 1'
                        },
                        {
                            ty: 'fl',
                            c: {a:0, k:[0, 0.8, 0.2, 1] }, // Green color
                            o: {a:0, k:100},
                            r: 1
                        }
                    ]
                }
            ]
        }
    ]
};

const placeholderErrorAnimation = {
    v: '5.5.7',
    fr: 30,
    ip: 0,
    op: 30,
    w: 200,
    h: 200,
    nm: 'Error',
    ddd: 0,
    assets: [],
    layers: [
        {
            ty: 4,
            ks: {
                o: {a: 0, k: 100},
                s: {a: 0, k: [100, 100]},
                p: {a: 0, k: [100, 100]},
                a: {a: 0, k: [0,0]}
            },
            shapes: [
                {
                    ty: 'gr',
                    it: [
                        {
                            ty: 'el',
                            d: 1,
                            s: {a:0, k:[180, 180]},
                            p: {a:0, k:[0,0]},
                            nm: 'Ellipse Path 1'
                        },
                        {
                            ty: 'fl',
                            c: {a:0, k:[0.8, 0.1, 0.1, 1] }, // Red color
                            o: {a:0, k:100},
                            r: 1
                        }
                    ]
                }
            ]
        }
    ]
};

const VerifyEmailStatus: React.FC<VerifyEmailStatusProps> = ({ success, message }) => {
  const router = useRouter();

  const animationData = success ? placeholderSuccessAnimation : placeholderErrorAnimation;

  const handleRedirect = () => {
    if (success) {
      router.push('/app/profile');
    } else {
      router.push('/app/register');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '20px' }}>
      <Lottie animationData={animationData} style={{ width: 200, height: 200, marginBottom: '20px' }} loop={success ? false : true} />
      <h1 style={{ fontSize: '24px', marginBottom: '10px', color: success ? '#4CAF50' : '#F44336' }}>
        {success ? 'Verification Successful!' : 'Verification Failed'}
      </h1>
      <p style={{ fontSize: '16px', marginBottom: '30px', maxWidth: '400px' }}>{message}</p>
      <Button
        onClick={handleRedirect}
        variant={success ? 'default' : 'danger'}
      >
        {success ? 'Go to Profile' : 'Try Again / Register'}
      </Button>
    </div>
  );
};

export default VerifyEmailStatus; 