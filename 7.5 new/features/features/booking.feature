Feature: Booking tickets
    Scenario: Should booking one ticket
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day 5
        When user choose time
        When user select row 1 and seat 5
        When user click button
        Then user see text 'Получить код бронирования'

    Scenario: Should booking one ticket
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day 5
        When user choose time
        When user select row 1 and seat 6
        When user select row 1 and seat 7
        When user click button
        Then user see text 'Получить код бронирования'

   Scenario: Should booking a booked ticket
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day 5
        When user choose time
        When user select the booked place
        Then user see button disabled 'true'