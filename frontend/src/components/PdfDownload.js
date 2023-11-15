import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer'

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  imageL: {
    width: 30,
    height: 30,
    marginRight: 30,
  },
  imageR: {
    width: 160,
    height: 30,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    position: 'absolute',
    fontSize: 9,
    bottom: 15,
    paddingTop: 20,
    textAlign: 'center',
    paddingHorizontal: 50,
    borderTop: 1,
    borderTopColor: 'gray',
    borderTopStyle: 'solid',
    color: 'black',
    opacity: '70',
    letterSpacing: '1',
    lineHeight: '1',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'blue',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
})

export const DietDoc = ({ content }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.headerView}>
          <Image style={styles.imageL} src='/logo.png' fixed />
          <Image style={styles.imageR} src='/TopImg.png' fixed />
        </View>

        <Text style={styles.text}>{content}</Text>
        <Text style={styles.footer} fixed>
        Dieta válida por 30 a 60 dias, após os quais você deverá gerar uma nova dieta com suas informações atuais para melhor desenvolvimento físico
        </Text>
        {/* <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        /> */}
      </Page>
    </Document>
  )
}
