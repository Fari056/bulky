import { StyleSheet } from 'react-native'

import React from 'react'
import { Hrline, MediumText, RowWrapper, RowWrapperBasic, Spacer, TinyTitle, Wrapper } from '..'
import { colors, fontFamily, fontSize } from '../../constants'
import { width } from 'react-native-dimension'
import { appStyles } from '../../utilities'

export const ProfileInfoCard = ({ title, text, textColor, withoutBorder }) => {

    const { styles } = useStyles(textColor)
    return (
        <Wrapper>
            <RowWrapperBasic style={appStyles.spaceBetween}>
                <MediumText style={styles.title}>{title}</MediumText>
                <TinyTitle style={styles.text}>{text}</TinyTitle>
            </RowWrapperBasic>
            {!withoutBorder &&
                <>
                    <Spacer isSmall />
                    <Hrline style={styles.br} />
                </>
            }
        </Wrapper>
    )
}
export const ProfileInfoCard_ = ({
  title,
  text = "",
  textColor,
  withoutBorder,
}) => {
  const formatText = (text) => {
     if (typeof text !== "string") {
       return "";
     }
    const words = text.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += 5) {
      lines.push(words.slice(i, i + 5).join(" "));
    }
    return lines.join("\n");
  };

  const { styles } = useStyles(textColor);

  return (
    <Wrapper>
      <RowWrapperBasic style={appStyles.spaceBetween}>
        <MediumText style={styles.title}>{title}</MediumText>
        <TinyTitle style={styles.text}>{formatText(text)}</TinyTitle>
      </RowWrapperBasic>
      {!withoutBorder && (
        <>
          <Spacer isSmall />
          <Hrline style={styles.br} />
        </>
      )}
    </Wrapper>
  );
};


const useStyles = (textColor) => {

    const styles = StyleSheet.create({
        title: {
            fontFamily: fontFamily.appTextRegular,
            color: colors.appTextColor12
        },
        br: {
            width: '100%',
            backgroundColor: colors.appBorder5
        },
        text: {
            fontFamily: fontFamily.appTextRegular,
            fontSize: fontSize.medium,
            color: textColor ?? colors.appTextColor2
        }
    })
    return { styles }
}