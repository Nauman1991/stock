<?php	
	$soapClient = new SoapClient('Location-API -WSDL.wsdl',array('trace' => 1));
		
	
	$params = array(
		'ClientInfo'  			=> array(
									'AccountCountryCode'		=> 'JO',
									'AccountEntity'		 	=> 'AMM',
									'AccountNumber'		 	=> '20016',
									'AccountPin'		 	=> '331421',
									'UserName'			=> 'testingapi@aramex.com',
									'Password'		 	=> 'R123456789$r',
									'Version'		 	=> 'v1.0',
									'Source' 			=> NULL			
								),

		// 'Transaction' 			=> array(
		// 							'Reference1'			=> '001',
		// 							'Reference2'			=> '002',
		// 							'Reference3'			=> '003',
		// 							'Reference4'			=> '004',
		// 							'Reference5'			=> '005'
							 
		// 						),
		'CountryCode'			=> 'SA',

		'State'				=> NULL,

		// 'NameStartsWith'		=> 'N'

		);
	
	// calling the method and printing results
	try {
		$auth_call = $soapClient->FetchCities($params);
		$string = implode(',',$auth_call->Cities->string) ;
		echo $string;
		die();

	} catch (SoapFault $fault) {
		die('Error : ' . $fault->faultstring);
	}
?>