Feature: Registration

  Scenario: Attempt to register with already registered user
    Given I open landing page
    And I have registered account
    And I have logged out
    When I press on Account button
    And I press log in
    When I press not yet a customer
    And I enter email address
    And I enter password
    And I enter password repeatedly
    And I select security question about elder sibling
    And I enter answer
    And I press register button
    Then I see message about email must be unique
    And I am on register page
