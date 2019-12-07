import React, { Component } from "react";
import { ShareContent, Share, Dimensions, StyleSheet } from "react-native";
import {
  View,
  Footer,
  FooterTab,
  Container,
  Header,
  Button,
  Icon,
  Body,
  Right,
  Left,
  Title,
  SubTitle,
  Text,
  Label,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Image,
  Spinner,
  Form,
  Input,
  Item,
  Grid,
  Col,
  Row
} from "native-base";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { State, reservePlayground, ratePlayground } from "../../state";
import { PlaygroundDto, ReservationDto } from "../../proxy/dtos/classes";
import * as _ from "lodash";
import { FooterComponent } from "../components";

class ViewReservationContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      reservation: state.data.myReservations[state.data.currentReservationId],
      loading: state.selectedPlayground.loading
    };
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ ratePlayground }, dispatch);
  }

  constructor() {
    super();
    this.state = {
      textComment: "",
      rate: 0
    };
  }
  props: {
    reservation: ReservationDto,
    loading: boolean,
    ratePlayground: (rate: any) => void
  };

  rate(value) {
    this.setState({ rate: value });
    console.log(value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading === false) {
      nextProps.navigation.navigate("HomeScreen");
    }
  }
  render() {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );
    var loadingPanel = this.props.loading ? (
      <Spinner />
    ) : (
      <Button
        full
        success
        rounded
        onPress={() => {
          this.props.ratePlayground(this.state);
        }}
      >
        <Text>Comment</Text>
      </Button>
    );
    var comment =
      new Date(this.props.reservation.date) < Date.now() ? (
        <Form>
          <Item floatingLable>
            <Label>Rating</Label>
            <Icon
              name="football"
              style={{ color: this.state.rate < 1 ? "black" : "green" }}
              onPress={() => {
                this.rate(1);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 2 ? "black" : "green" }}
              onPress={() => {
                this.rate(2);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 3 ? "black" : "green" }}
              onPress={() => {
                this.rate(3);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 4 ? "black" : "green" }}
              onPress={() => {
                this.rate(4);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 5 ? "black" : "green" }}
              onPress={() => {
                this.rate(5);
              }}
            />
          </Item>
          <Item floatingLable>
            <Label>Comment</Label>
            <Input
              onChangeText={txt => {
                this.setState({
                  textComment: txt
                });
              }}
            />
          </Item>
          {loadingPanel}
        </Form>
      ) : (
        <Button
          full
          iconRight
          success
          rounded
          onPress={() => {
            Share.share({
              title: "Reservation Number",
              message: `Reservation Number: ${this.props.reservation.id}`,
              url: " "
            });
          }}
        >
          <Icon name="share" />
          <Text>Share</Text>
        </Button>
      );
    return (
      <Container>
        <Content>
          {this.props.reservation ? (
            <View>
              <View style={{ flex: 1 }}>
                <Thumbnail
                  source={require("../../themes/imgs/football.jpeg")}
                  style={{
                    width: screenWidth / 0.5,
                    height: screenHeight / 3,
                    borderRadius: 0
                  }}
                />
              </View>
              <Grid style={{ marginTop: 20 }}>
                <Row style={{ height: 100 }}>
                  <Col size={50} style={{ backgroundColor: "#FFFFFF" }}>
                    <Text style={styles.text}>
                      <Label style={styles.label}>
                        Reservation Number:{"\n"}
                      </Label>
                      {this.props.reservation.id}
                    </Text>
                  </Col>
                  <Col size={50} style={{ backgroundColor: "#F6F6F6" }}>
                    <Text style={styles.text}>
                      <Label style={styles.label}>Date:{"\n"}</Label>
                      {this.props.reservation.date.split(" ")[0]}
                    </Text>
                  </Col>
                </Row>

                <Row style={{ height: 100 }}>
                  <Col size={50} style={{ backgroundColor: "#F6F6F6" }}>
                    <Text style={styles.text}>
                      <Label style={styles.label}>Time:{"\n"}</Label>
                      {this.props.reservation.reservationDetails.hour >= 12
                        ? `${
                            this.props.reservation.reservationDetails.hour -
                              12 ==
                            0
                              ? 12 + " AM"
                              : this.props.reservation.reservationDetails.hour -
                                12 +
                                " PM"
                          }`
                        : `${this.props.reservation.reservationDetails.hour} AM`}{" "}
                    </Text>
                  </Col>
                  <Col size={50} style={{ backgroundColor: "#FFFFFF" }}>
                    <Text style={styles.text}>
                      <Label style={styles.label}>Playground Name:{"\n"}</Label>
                      {this.props.reservation.playground.name}
                    </Text>
                  </Col>
                </Row>

                <Row style={{ height: 100 }}>
                  <Col style={{ backgroundColor: "#FFFFFF" }}>
                    <Text style={styles.text}>
                      <Label style={styles.label}> Paid amount:{"\n"}</Label>

                      {this.props.reservation.reservationDetails.paid}
                    </Text>
                  </Col>

                  <Col style={{ backgroundColor: "F6F6F6" }}>
                    <Text style={styles.text}>
                      <Label style={styles.label}>Total price:{"\n"}</Label>
                      {this.props.reservation.reservationDetails.totalPrice}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </View>
          ) : (
            <Spinner color={"green"} />
          )}
          {comment}
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

export const ViewReservationScreen = connect(
  ViewReservationContainer.mapStateToProps,
  ViewReservationContainer.mapDispatchToProps
)(ViewReservationContainer);

const styles = StyleSheet.create({
  text: {
    color: "black"
  },
  label: {
    color: "#67ad3b"
  }
});
