import React from 'react';
import { Card, Button, ButtonGroup, Container } from "react-bootstrap";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useState } from 'react';
import dayjs from "dayjs";
import { useEffect } from 'react';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'col'
    },
    title: {
        backgroundColor: '#143642',
        color: 'white',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    footer:{
        position: 'absolute',
        bottom: 0,
        width:'100%'
    },
    text: {
        marginBottom: 5
    },
    table: {
        width: '100%',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 8,
        borderBottom: '1px solid black'
    },
    col:{
        marginLeft:20,
        width: "33%"
    }, 
    header:{
        backgroundColor:'#797877',
        color:'#E4E4E4'
    },
    summaryHeader:{
        textAlign: 'center',
        marginTop:20,
        marginBottom:10,
        fontSize: 30
    },
    summary:{
        marginLeft:20
    }
});


// Create Document Component
const Report = (props) => (  
    <Document title="SPG Weekly report">
        <Page size="A4" style={styles.page}>
            <View style={styles.title} fixed>
                <Text style={styles.text}>SPG - Weekly report</Text>
                <Text style={styles.text}>{dayjs(props.start).format('DD/MM/YYYY')} to {dayjs(props.start).add(props.duration,'day').format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.table}>
                <View style={[styles.row, styles.header]} fixed>
                    <Text style={[styles.header, styles.col ]}>Product Name</Text>
                    <Text style={[styles.header, styles.col ]}>Farmer</Text>
                    <Text style={[styles.header, styles.col ]}>Quantity</Text>
                </View>
                {
                    props.data.map((el, i) =>
                    (<View key={i} style={styles.row} wrap={false}>
                        <Text style={styles.col}>{el.name}</Text>
                        <Text style={styles.col}>{el.farmerName} {el.farmerSurname}</Text>
                        <Text style={styles.col}>{el.quantity} {el.measure}</Text>
                    </View>)
                    )
                }
            </View>
        </Page>
        <Page>
        <View style={styles.title} fixed>
                <Text style={styles.text}>SPG - Weekly report</Text>
                <Text style={styles.text}>10/01/2022 to 16/01/2022</Text>
            </View>
            <View>
                <Text style={[styles.text, styles.summaryHeader, styles.summary]}>Summary:</Text>
                <Text style={[styles.text, styles.summary]}>Wasted kg: 700</Text>
                <Text style={[styles.text, styles.summary]}>Wasted units: 80</Text>
            </View>
            <View style={[styles.title, styles.footer]}>
                <Text>End of report</Text>
            </View>
        </Page>
    </Document>
);

export default function ManagerHome(props) {

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }
    const [monday, setMonday] = useState(); // Mon Nov 08 2010

    useEffect(()=>{
        setMonday(getMonday(props.date))
    }, [props.date])

    const wreport = [
        {
            productid: 1,
            name: "mela",
            quantity: 3,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 2,
            name: "patate",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        }, {
            productid: 3,
            name: "cipolle",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 4,
            name: "uova",
            quantity: 2,
            measure: "units",
            farmerName: "Faye",
            farmerSurname: "Total"
        }, {
            productid: 1,
            name: "mela",
            quantity: 3,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 2,
            name: "patate",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        }, {
            productid: 3,
            name: "cipolle",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 4,
            name: "uova",
            quantity: 2,
            measure: "units",
            farmerName: "Faye",
            farmerSurname: "Total"
        }, {
            productid: 1,
            name: "mela",
            quantity: 3,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 2,
            name: "patate",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        }, {
            productid: 3,
            name: "cipolle",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 4,
            name: "uova",
            quantity: 2,
            measure: "units",
            farmerName: "Faye",
            farmerSurname: "Total"
        }, {
            productid: 1,
            name: "mela",
            quantity: 3,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 2,
            name: "patate",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        }, {
            productid: 3,
            name: "cipolle",
            quantity: 1,
            measure: "kg",
            farmerName: "Spike",
            farmerSurname: "Spiegel"
        },
        {
            productid: 4,
            name: "uova",
            quantity: 2,
            measure: "units",
            farmerName: "Faye",
            farmerSurname: "Total"
        }
    ]

    return (
        <Container className="justify-content-center">
            <Card className="mt-4">
                <Card.Header as="h5">What do you want to do?</Card.Header>
                <Card.Body className="mb-2">
                    <ButtonGroup vertical aria-label="Directions" className="d-flex" >
                        <Button variant="yellow" className="mx-auto d-flex p-0 mb-4" size="lg" id="toprod">
                            <PDFDownloadLink document={<Report data={wreport} start={monday} duration={6}/>} fileName="SPG-weekly-report.pdf" className="py-2 yellowLink" style={{ minWidth: "100%", textDecoration: "none" }}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Get weekly report')}
                            </PDFDownloadLink>
                        </Button>

                        <Button variant="yellow" className="mx-auto d-flex p-0 mb-4" size="lg" id="toprod">
                            <PDFDownloadLink document={<Report data={wreport} day={props.date}/>} fileName="SPG-monthly-report.pdf" className="py-2 yellowLink" style={{ minWidth: "100%", textDecoration: "none" }}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Get monthly report')}
                            </PDFDownloadLink>
                        </Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}