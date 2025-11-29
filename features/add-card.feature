Feature: Payment methods

  Scenario: Add new card details
    Given I open landing page
    And I have logged with a new user
    And I press on Account button
    And I press on Orders and Payments
    And I press My Payment options
    And I am on My Payment options page
    When I press add new card
    And fill in card details
      | Name         | Card Number       | Expiry Month | Expiry Year |
      | John Goodman | 1234567812345678  | 4            | 2085        |
    And I submit new card details
    Then I see added card
      | Name         | Card Number      | Expiry       |
      | John Goodman | ************5678 | 4/2085       |
