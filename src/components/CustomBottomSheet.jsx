import React from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const CustomBottomSheet = React.forwardRef(
  ({modalContent, onCloseBottomSheet, snapPoints}, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        style={styles.container}
        onClose={onCloseBottomSheet}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            enableTouchThrough={false}
            style={[styles.backgroundColor, StyleSheet.absoluteFillObject]}
          />
        )}
        snapPoints={[`${snapPoints}%`]}
        handleIndicatorStyle={styles.indicatorStyle}
        enablePanDownToClose={true}>
        {modalContent}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 48,
    overflow: 'hidden',
  },
  backgroundColor: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  indicatorStyle: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});

export default CustomBottomSheet;
