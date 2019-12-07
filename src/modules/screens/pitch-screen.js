import React, { Component } from "react";
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
  Image
} from "native-base";
import { NavigationStackScreenOptions } from "react-navigation";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import { Dimensions } from "react-native";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { State, reservePlayground } from "../../state";
import { PlaygroundDto } from "../../proxy/dtos/classes";
import * as _ from "lodash";

class PitchScreenContainer extends Component {
  constructor() {
    super();
    var date = new Date();
    console.log(date.toISOString().split("T")[0]);
    this.state = {
      selectedDate: date.toISOString().split("T")[0],
      minDate: date.toISOString().split("T")[0]
    };
  }
  static mapStateToProps(state: State) {
    return {
      playground: state.selectedPlayground.current
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        reservePlayground
      },
      dispatch
    );
  }
  // -----------------------------------------------------
  props: {
    playground: PlaygroundDto,
    reservePlayground: (date: string) => void
  };

  static navigationOptions = ({ navigation, state }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.title
    };
  };

  render() {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );
    var selectedDate = this.state.selectedDate
      ? {
          [this.state.selectedDate]: {
            selected: true
          }
        }
      : null;

    return (
      <Container>
        <Content>
          <Card
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <CardItem cardBody style={{}}>
              <Thumbnail
                source={require("../../themes/imgs/pg1.jpg")}
                style={{ height: 100, width: null, flex: 1 }}
                square
              />
            </CardItem>
            <CardItem
              cardBody
              style={{ flexDirection: "column", alignContent: "space-between" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="football" style={{ padding: 4 }} />
                <Icon name="beer" style={{ padding: 4 }} />
                <Icon name="shirt" style={{ padding: 4 }} />
                <Icon name="wifi" style={{ padding: 4 }} />
                <Icon name="bulb" style={{ padding: 4 }} />
                <Icon name="man" style={{ paddingLeft: 4 }} />
                <Text style={{ fontSize: 30 }}>|</Text>
                <Icon name="woman" />
              </View>
              <Calendar
                style={{
                  width: screenWidth
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#67ad3b",
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: "#ffffff",
                  selectedDayTextColor: "#07651d",
                  todayTextColor: "#00adf5",
                  dayTextColor: "#2d4150",
                  textDisabledColor: "#d9e1e8",
                  dotColor: "#00adf5",
                  selectedDotColor: "#ffffff",
                  arrowColor: "#ffffff",
                  monthTextColor: "#ffffff",
                  indicatorColor: "blue",
                  textDayFontWeight: "300",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16
                }}
                minDate={this.state.minDate}
                markedDates={selectedDate}
                onDayPress={day => {
                  console.log("selected day", day.dateString);
                  this.setState({ selectedDate: day.dateString });
                }}
              />
              <Button
                full
                success
                rounded
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20
                }}
                onPress={() => {
                  console.log("Reserve");
                  this.props.reservePlayground(this.state.selectedDate);
                  this.props.navigation.navigate("ReservationsList");
                }}
              >
                <Text>Reserve</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                this.props.navigation.navigate("HomeScreen");
              }}
            >
              <Text>Home</Text>
            </Button>
            <Button
              onPress={() => {
                console.log("Reserve");
                this.props.reservePlayground(this.state.selectedDate);
                this.props.navigation.navigate("ReservationsList");
              }}
            >
              <Text>My Reservations</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export const PitchScreen = connect(
  PitchScreenContainer.mapStateToProps,
  PitchScreenContainer.mapDispatchToProps
)(PitchScreenContainer);
