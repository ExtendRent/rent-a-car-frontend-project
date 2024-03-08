import React from 'react'
import { useSelector } from 'react-redux';
import "./OverlayLoader.css";
import { RootState } from '../../store/configureStore';
import { useAppSelector } from '../../store/useAppSelector';

type Props = {}

const OverlayLoader = (props: Props) => {
    const loadingState = useAppSelector((state: RootState) => state.loading);
  return (
    <>
        {loadingState > 0 && (
            <div className="overlay">
                <div className="overlay__inner">
                    <div className="overlay__content">
                        <span className="spinner"></span>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default OverlayLoader