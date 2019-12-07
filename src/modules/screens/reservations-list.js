import React, { Component } from "react";
import {
  List,
  Footer,
  FooterTab,
  ListItem,
  Text,
  Button,
  Body,
  Container,
  Content,
  View,
  Left,
  Right,
  Icon,
  Grid,
  Col,
  Row,
  CardItem,
  Card
} from "native-base";
import { ImageBackground, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { Col, Row, Grid } from "react-native-easy-grid";

import {
  State,
  selectReservationHour,
  getReservationDetails
} from "../../state";
import { ReservationDto, PlaygroundDto } from "../../proxy/dtos/classes";

import * as _ from "lodash";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FooterComponent } from "../components";

class ReservationsListContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      playground: state.selectedPlayground.current,
      reservedHours: state.selectedPlayground.reservedHours
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        selectReservationHour,
        getReservationDetails
      },
      dispatch
    );
  }
  props: {
    reservedHours: ReservationDto[],
    playground: PlaygroundDto,
    selectReservationHour: (hour: number) => void,
    getReservationDetails: (reservationId: number) => void
  };
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Available Hours"
    };
  };

  dayHours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24
  ];

  render() {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );

    var hours = this.dayHours;
    _.forEach(this.props.reservedHours, reservation => {
      hours[reservation.reservationDetails.hour - 1] = reservation;
    });
    hours = _.filter(hours, h => h.reservationDetails == null);
    console.log(hours);
    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {_.map(hours, (res, key) => {
                console.log(res);
                const btn = res.reservationDetails ? (
                  <Button
                    full
                    rounded
                    success
                    style={{
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 20
                    }}
                    onPress={() => {
                      console.log(res.id);
                      this.props.getReservationDetails(res.id);
                      this.props.navigation.navigate("ViewReservation");
                    }}
                  >
                    <Text>View</Text>
                  </Button>
                ) : (
                  <Button
                    full
                    rounded
                    success
                    style={{
                      width: 120,
                      height: 40
                    }}
                    onPress={() => {
                      this.props.selectReservationHour(res);
                      console.log("Reserve");
                      this.props.navigation.navigate("ConfirmReservation");
                    }}
                  >
                    <Text>Reserve</Text>
                  </Button>
                );
                return (
                  <View key={key}>
                    <Grid>
                      <Col size={5}>
                        <Image
                          source={require("../../themes/imgs/green-circle.png")}
                          style={{ width: 15, height: 15, marginTop: 1 }}
                        />
                      </Col>
                      <Col size={95}>
                        <Text>
                          {res >= 12
                            ? `${res - 12 == 0 ? 12 + " AM" : res - 12 + " PM"}`
                            : `${res} AM`}
                        </Text>
                      </Col>
                    </Grid>

                    <View style={{ flex: 1, height: 150 }}>
                      <ImageBackground
                        source={require("../../themes/imgs/main-shape.png")}
                        style={{
                          width: screenWidth,
                          height: 150
                        }}
                      >
                        <Grid>
                          <Col style={{ marginTop: 40 }}>
                            <Text style={{ alignSelf: "center" }}>
                              Price/Hour
                            </Text>

                            <Text note style={{ alignSelf: "center" }}>
                              {res > this.props.playground.switchingHour &&
                              res <= this.props.playground.switchingHour + 12
                                ? `${this.props.playground.morningPrice} LE`
                                : `${this.props.playground.nightPrice} LE`}
                            </Text>
                          </Col>

                          <Col style={{ marginTop: 40 }}>{btn}</Col>
                        </Grid>
                      </ImageBackground>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </Content>
        <FooterComponent
          navigation={this.props.navigation}
          homeActive={false}
          myReservationsActive={false}
        />
      </Container>
    );
  }
}

export const ReservationsList = connect(
  ReservationsListContainer.mapStateToProps,
  ReservationsListContainer.mapDispatchToProps
)(ReservationsListContainer);
