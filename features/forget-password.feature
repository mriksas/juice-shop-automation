Feature: forgot password
    Scenario: Forgot password  
    Given I open landing page  
    And I have registered account  
    And I have logged out  
    And I press on Account button  
    And I press log in  
    When I press 'forgot password'  
    And I enter email in forgot email page  
    And I click on security question field  
    And I see security question  
    And I enter security question  
    And I enter new password and confirm  
    Then I see message about successfully changed password