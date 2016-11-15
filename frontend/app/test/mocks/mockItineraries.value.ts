/// <reference path="../_test.ts" />

'use strict';

angular
	.module('mocks')
	.value('mockItineraries', [
    {
			"tripKey": "eyJ0cmlwSWQiOiI0SldPZ2kzQSIsInNlZ21lbnRQb2ludGVycyI6WzAsMCwwXX0=",
			"sessionId": "41qUxj2R4yeq8go2A",
			"origin": {
					"description": "Origin",
					"location": {
							"latitude": 48.71157,
							"longitude": 9.46301
					},
					"timeZone": "Europe/Berlin"
			},
			"destination": {
					"description": "Destination",
					"location": {
							"latitude": 52.41754,
							"longitude": 9.82674
					},
					"timeZone": "Europe/Berlin"
			},
			"timing": {
					"value": "2015-10-04T12:00:00",
					"timeZone": "Europe/Berlin",
					"targetDate": "true"
			},
			"departureTime": "2015-10-04T08:04:00",
			"arrivalTime": "2015-10-04T13:52:08",
			"distance": 558.2700000000001,
			"duration": 348.1333333333333,
			"price": 116,
			"currency": "eur",
			"type": 2,
			"segmentsContainer": [
					{
							"isMajor": 0,
							"alternatives": [
									[
											{
													"start": {
															"description": "Origin",
															"location": {
																	"latitude": 48.71157,
																	"longitude": 9.46301
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Reichenbach(Fils)",
															"location": {
																	"latitude": 48.70808,
																	"longitude": 9.46375
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 6,
													"distance": 0.48,
													"path": "i~hhHyfwx@jGw@nDVPlBtEiBTwB",
													"isMajor": 0,
													"type": 1,
													"price": {
															"amount": 0,
															"currency": "eur"
													}
											}
									]
							]
					},
					{
							"isMajor": 1,
							"alternatives": [
									[
											{
													"start": {
															"description": "Reichenbach(Fils)",
															"location": {
																	"latitude": 48.70808,
																	"longitude": 9.46375
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Oldenburger Allee",
															"location": {
																	"latitude": 52.41711,
																	"longitude": 9.82973
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "2015-10-04T06:10:00",
													"arrivalTime": "2015-10-04T11:48:08",
													"duration": 338.1333333333333,
													"distance": 557.47,
													"path": {
															"points": "sghhHkkwx@dVfqBgPjxCo}@pzAwKruBab@fdBed@p|GmpAb`HajB|}@ksCbiCaeBxdDXhlAhaAh~BnRfTod@_v@}|@rNiaAbaC{f@uA}dBdTsz@so@a_C`hCukChqKarAhpHovCbvGgbEn|HdDfnBrJx_M~@f{Ba_BhmDccAtpC}x@pG}QhbAbe@`kApBnt@cf@h`@q_AjqBkkAxq@ar@xhAgrAzw@_Ar|Bqq@``@kiBdjA_o@{My{AbdA{hB|L}dAhlBgVhyAuPfqCdGlw@mtAax@qkIynGyrMoqBi~HagAwvD{EioFih@ojAgf@}f@sJwl@r_Aa^rmCwkA~wE{eFbtQqaD~pK}mBkPibBi`CaiCmSgdFfB{nCpXc|EhzAeiDvdAeoCrc@mcF_rFmsBqt@coFbvB{dCzZcqA{a@q_D{iBmpMmLqtAw_AqkGukIiaHuoEwnCecByp@T_f@|gDfCfg@kAiNhCstCe[iyBmx@e|@wf@kjAyk@j]kz@hg@ax@ogA}x@mlCaf@gk@xBu{@~WchB`l@GiFcbBgIwjEjTqjEu`@y|BudAqgEwNmkGjEe_D}ZcwAzt@cyCmgBa|FiuFykTozC{oSif@owC_cCcaDwMwvC{fDicDmmBozL}|Aoy@_}AubC}vA}xIwaAqd@uPo~CwtA}nDko@_Bqt@`W}vDskDulBcbDymDuyDwnAejCy`B}lBcaCmzFyaBvOkkAy]quCe_BgdBrGs_Arq@o}BomAgbExQ}nC`yActCx}EuqBlhByrJx{AunDlQaxBhhAetBtn@ukBmUouDeJs]jGksF~^ayLj_BggCcVanEkOihEwC_yBmu@mdFaCuuAuAomDztAqkCrbE}xDr~FsgCd|BixH|dDujB}e@kmA|o@_aAbb@sc@khAk~AiuAmp@dCqo@kp@{Ng~Bbc@q{Emw@svBw{@{jE}_Cm~Gms@srIe{@q{DsdBu_Gs~BquEoyJqxLqgBukD{aA}kDmv@q_AslAlXqaCtK_zDub@uwDwb@mnAo}@mwFe`EsyBskAu}@~Xq}BnfB_cD`s@imCtyCu|AlfAqc@lWq[{Wur@_dCmnAs_@qrAwwCwlBjjCunA~f@_`BzSevDvtDqd@dbAy`AlViRlcBiq@xbCm_AlhAk|ApdC}{ArlBgeB|x@wkCnhDchDdlAknB~uA}pGpReiDqvBgoA_IgfA_nC}}AeiBkeCwbBc|FwvDy~Ang@ueA||@kaFtaEygKduF_f@~pB_ItTejAmx@q~B{~Kyp@soA"
													},
													"isMajor": 1,
													"type": 8,
													"price": {
															"amount": 116,
															"currency": "eur"
													},
													"alternatives": [
															{
																	"departureTime": "2015-10-04T08:10:00",
																	"arrivalTime": "2015-10-04T13:48:08",
																	"duration": 338.1333333333333,
																	"price": {
																			"amount": 116,
																			"currency": "eur"
																	},
																	"pricingOptions": [],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T06:59:00",
																	"arrivalTime": "2015-10-04T13:33:08",
																	"duration": 394.1333333333333,
																	"price": {
																			"amount": 116,
																			"currency": "eur"
																	},
																	"pricingOptions": [],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T06:02:00",
																	"arrivalTime": "2015-10-04T11:48:08",
																	"duration": 346.1333333333333,
																	"price": {
																			"amount": 116,
																			"currency": "eur"
																	},
																	"pricingOptions": [],
																	"information": "trip.segments.multiple"
															}
													]
											}
									]
							]
					},
					{
							"isMajor": 0,
							"alternatives": [
									[
											{
													"start": {
															"description": "Oldenburger Allee",
															"location": {
																	"latitude": 52.41711,
																	"longitude": 9.82973
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Destination",
															"location": {
																	"latitude": 52.41754,
																	"longitude": 9.82674
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 4,
													"distance": 0.32,
													"path": "}u|~Hyz~z@rCfGHp@s@x@_DvA_@hC",
													"isMajor": 0,
													"type": 1,
													"price": {
															"amount": 0,
															"currency": "eur"
													}
											}
									]
							]
					}
			]
	},
	{
			"tripKey": "eyJ0cmlwSWQiOiI0SmxidXhqaDAiLCJzZWdtZW50UG9pbnRlcnMiOlswLDAsMCwwLDBdfQ==",
			"sessionId": "41qUxj2R4yeq8go2A",
			"origin": {
					"description": "Origin",
					"location": {
							"latitude": 48.71157,
							"longitude": 9.46301
					},
					"timeZone": "Europe/Berlin"
			},
			"destination": {
					"description": "Destination",
					"location": {
							"latitude": 52.41754,
							"longitude": 9.82674
					},
					"timeZone": "Europe/Berlin"
			},
			"timing": {
					"value": "2015-10-04T12:00:00",
					"timeZone": "Europe/Berlin"
			},
			"departureTime": "2015-10-04T03:45:00",
			"arrivalTime": "2015-10-04T08:41:00",
			"distance": 496.04,
			"duration": 296,
			"price": 363.67,
			"currency": "eur",
			"type": 2,
			"segmentsContainer": [
					{
							"isMajor": 0,
							"alternatives": [
									[
											{
													"start": {
															"description": "Origin",
															"location": {
																	"latitude": 48.71157,
																	"longitude": 9.46301
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Reichenbach(Fils)",
															"location": {
																	"latitude": 48.70808,
																	"longitude": 9.46375
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 6,
													"distance": 0.48,
													"path": "i~hhHyfwx@jGw@nDVPlBtEiBTwB",
													"isMajor": 0,
													"type": 1,
													"price": {
															"amount": 0,
															"currency": "eur"
													}
											},
											{
													"start": {
															"description": "Reichenbach(Fils)",
															"location": {
																	"latitude": 48.70808,
																	"longitude": 9.46375
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Stuttgart",
															"location": {
																	"latitude": 48.69036,
																	"longitude": 9.19219
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 49,
													"distance": 44.47,
													"path": "gqzhHsjgw@vlBjaFpo@vu@dUhh@vNx{@zJ`n@|[pGnOpi@~Nn}Afj@ruB~b@rG|FkDdj@_aA`fAbUjs@r]lnAwuBvu@k`BvYccDxJilCohhhHmkwx@y`@zcIvAtb@me@bu@x@~z@xFpi@cd@v[aIljCkG|{@u@|m@giA~aFyDhDyNhjBoVvc@kt@zSsuBnxA}TxZqe@fg@sYtRmYx]mj@pkA_Nz~@gCgA",
													"isMajor": 0,
													"type": 8,
													"price": {
															"amount": 17,
															"currency": "eur"
													}
											}
									],
									[
										{
													"start": {
															"description": "Origin",
															"location": {
																	"latitude": 48.71157,
																	"longitude": 9.46301
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Stuttgart",
															"location": {
																	"latitude": 48.70808,
																	"longitude": 9.46375
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 6,
													"distance": 0.48,
													"path": "i~hhHyfwx@jGw@nDVPlBtEiBTwB",
													"isMajor": 0,
													"type": 1,
													"price": {
															"amount": 30,
															"currency": "eur"
													}
											}
									]
							]
					},
					{
							"isMajor": 1,
							"alternatives": [
									[
											{
													"start": {
															"description": "Stuttgart",
															"location": {
																	"latitude": 48.69036,
																	"longitude": 9.19219
															},
															"timeZone": "Europe/Berlin",
															"code": "STR"
													},
													"end": {
															"description": "Hannover",
															"location": {
																	"latitude": 52.45859,
																	"longitude": 9.69459
															},
															"timeZone": "Europe/Berlin",
															"code": "HAJ"
													},
													"departureTime": "2015-10-04T04:40:00",
													"arrivalTime": "2015-10-04T07:45:00",
													"duration": 185,
													"distance": 420.48,
													"path": "",
													"isMajor": 1,
													"type": 16,
													"bookingLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fluft%2f1%2f16577.12067.2015-10-04%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d343.67%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26q_datetime_utc%3d2015-09-23T10%3a38%3a38",
													"price": {
															"amount": 343.67,
															"currency": "EUR"
													},
													"details": {
															"carriers": [
																	{
																			"code": "LH",
																			"name": "Lufthansa",
																			"imageUrl": "http://s1.apideeplink.com/images/airlines/LH.png",
																			"displayCode": "LH"
																	}
															],
															"operatingCarriers": [
																	{
																			"code": "LH",
																			"name": "Lufthansa",
																			"imageUrl": "http://s1.apideeplink.com/images/airlines/LH.png",
																			"displayCode": "LH"
																	}
															],
															"flightNumbers": [
																	{
																			"flightNumber": "127",
																			"carrier": {
																					"code": "LH",
																					"name": "Lufthansa",
																					"imageUrl": "http://s1.apideeplink.com/images/airlines/LH.png",
																					"displayCode": "LH"
																			}
																	},
																	{
																			"flightNumber": "48",
																			"carrier": {
																					"code": "LH",
																					"name": "Lufthansa",
																					"imageUrl": "http://s1.apideeplink.com/images/airlines/LH.png",
																					"displayCode": "LH"
																			}
																	}
															]
													},
													"alternatives": [
															{
																	"departureTime": "2015-10-04T04:40:00",
																	"arrivalTime": "2015-10-04T07:45:00",
																	"duration": 185,
																	"price": {
																			"amount": 343.67,
																			"currency": "EUR",
																			"estimate": false
																	},
																	"pricingOptions": [
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1298,
																					"price": {
																							"amount": 343.67,
																							"currency": "EUR",
																							"estimate": false
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fluft%2f1%2f16577.12067.2015-10-04%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d343.67%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26q_datetime_utc%3d2015-09-23T10%3a38%3a38"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 355.38,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ft2us%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d355.38%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3d0a25c73659c106b792dbfdb5c3927d4e%26q_datetime_utc%3d2015-09-24T08%3a16%3a04"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 359.96,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2forbz%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d359.96%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3d143a3b86eab241225a8c82c003558bab%26q_datetime_utc%3d2015-09-24T08%3a15%3a56"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 359.96,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fctus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d359.96%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3d0d2187038b5c1816e915bbaa4ff93b33%26q_datetime_utc%3d2015-09-24T08%3a15%3a56"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 360.07,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ftram%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d360.07%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3deafa9fdf4f9f8df7000e1456986c6833%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 360.07,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fpcln%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d360.07%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3db6706ae18e2a58cbc54d28adfb3553e5%26q_datetime_utc%3d2015-09-24T08%3a15%3a57"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 361.58,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fbfus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d361.58%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3deaf023ead42c9ffd4a52a80e4bb5bed4%26q_datetime_utc%3d2015-09-24T08%3a16%3a01"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 364.55,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fffus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d364.55%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3da48cd51d4d1d172025c6ba136abc4053%26q_datetime_utc%3d2015-09-24T08%3a15%3a54"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 364.55,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ffnus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d364.55%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3d9a4d61aef13ccbf5335fc98e2697bb6d%26q_datetime_utc%3d2015-09-24T08%3a15%3a55"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 375.24,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fedus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d375.24%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3dff44c666789d19557ae8ba3da3579c7e%26q_datetime_utc%3d2015-09-24T08%3a15%3a55"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 442.34,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fatus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d442.34%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3d80d04a135c90fbbf42a33ccea36802d4%26q_datetime_utc%3d2015-09-24T08%3a15%3a57"
																			}
																	],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T04:40:00",
																	"arrivalTime": "2015-10-04T10:10:00",
																	"duration": 330,
																	"price": {
																			"amount": 388.12,
																			"currency": "EUR"
																	},
																	"pricingOptions": [
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 388.12,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ft2us%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c96%7c11616%7c2015-10-04T08%3a15%7c14385%7c2015-10-04T09%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d388.12%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3d1cd83e234938ca5ec469e6271ac2cd4d%26q_datetime_utc%3d2015-09-24T08%3a16%3a04"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 397.36,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fffus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c96%7c11616%7c2015-10-04T08%3a15%7c14385%7c2015-10-04T09%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d397.36%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3da94ba26a78065fad7f968b81a28b64ae%26q_datetime_utc%3d2015-09-24T08%3a15%3a54"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 441.18,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ffnus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c96%7c11616%7c2015-10-04T08%3a15%7c14385%7c2015-10-04T09%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d441.18%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3df10da9c9095ee39c08540839d3dd54e1%26q_datetime_utc%3d2015-09-24T08%3a15%3a55"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 447.98,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ftram%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c96%7c11616%7c2015-10-04T08%3a15%7c14385%7c2015-10-04T09%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d447.98%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3d6bab71c4fdfc547606069b0db26ad9ab%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 472.7,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fatus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c96%7c11616%7c2015-10-04T08%3a15%7c14385%7c2015-10-04T09%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d472.70%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3dccac5bc7ad90da0b8dcac9df0575a1c3%26q_datetime_utc%3d2015-09-24T08%3a15%3a57"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 660.41,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fbfus%2f1%2f16577.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c127%7c16577%7c2015-10-04T06%3a40%7c11616%7c2015-10-04T07%3a30%3bflight%7c-32090%7c96%7c11616%7c2015-10-04T08%3a15%7c14385%7c2015-10-04T09%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d660.41%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d9ed2ec26-370f-4ccf-b94a-74966a8c851a%26deeplink_ids%3df9122820c98fb090d1f4af1b78125070%26q_datetime_utc%3d2015-09-24T08%3a16%3a01"
																			}
																	],
																	"information": "trip.segments.multiple"
															}
													]
											}
									]
							]
					},
					{
							"isMajor": 0,
							"alternatives": [
									[
											{
													"start": {
															"description": "Hannover",
															"location": {
																	"latitude": 52.45859,
																	"longitude": 9.69459
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Oldenburger Allee",
															"location": {
																	"latitude": 52.41711,
																	"longitude": 9.82973
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 52,
													"distance": 30.29,
													"path": "y`p~Hq{iz@sb@cBaY|D_b@io@yQei@{n@gi@{`@cTu_@q\\_V{i@gPke@km@ihDid@okB[qv@a^ui@iRi`@s}d_Icuez@zr@czEzfGvvGf}AmhDleFy_IdYhaH",
													"isMajor": 0,
													"type": 8,
													"price": {
															"amount": 3,
															"currency": "eur"
													}
											},
											{
													"start": {
															"description": "Oldenburger Allee",
															"location": {
																	"latitude": 52.41711,
																	"longitude": 9.82973
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Destination",
															"location": {
																	"latitude": 52.41754,
																	"longitude": 9.82674
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 4,
													"distance": 0.32,
													"path": "}u|~Hyz~z@rCfGHp@s@x@_DvA_@hC",
													"isMajor": 0,
													"type": 1,
													"price": {
															"amount": 0,
															"currency": "eur"
													}
											}
									]
							]
					}
			]
	},
	{
			"tripKey": "eyJ0cmlwSWQiOiJWSlpidXhvMkEiLCJzZWdtZW50UG9pbnRlcnMiOlswLDAsMSwwLDBdfQ==",
			"sessionId": "41qUxj2R4yeq8go2A",
			"origin": {
					"description": "Origin",
					"location": {
							"latitude": 48.71157,
							"longitude": 9.46301
					},
					"timeZone": "Europe/Berlin"
			},
			"destination": {
					"description": "Destination",
					"location": {
							"latitude": 52.41754,
							"longitude": 9.82674
					},
					"timeZone": "Europe/Berlin"
			},
			"timing": {
					"value": "2015-10-04T12:00:00",
					"timeZone": "Europe/Berlin"
			},
			"departureTime": "2015-10-04T05:56:00",
			"arrivalTime": "2015-10-04T09:36:00",
			"distance": 513.3000000000001,
			"duration": 276.25,
			"price": 248.18,
			"currency": "eur",
			"type": 2,
			"segmentsContainer": [
					{
							"isMajor": 0,
							"alternatives": [
									[
											{
													"start": {
															"description": "Origin",
															"location": {
																	"latitude": 48.71157,
																	"longitude": 9.46301
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Reichenbach(Fils)",
															"location": {
																	"latitude": 48.70808,
																	"longitude": 9.46375
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 6,
													"distance": 0.48,
													"path": "i~hhHyfwx@jGw@nDVPlBtEiBTwB",
													"isMajor": 0,
													"type": 1,
													"price": {
															"amount": 0,
															"currency": "eur"
													}
											}
									]
							]
					},
					{
							"isMajor": 1,
							"alternatives": [
									[
											{
													"start": {
															"description": "Reichenbach(Fils)",
															"location": {
																	"latitude": 48.70808,
																	"longitude": 9.46375
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Frankfurt",
															"location": {
																	"latitude": 50.05143,
																	"longitude": 8.5714
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "2015-10-04T06:02:00",
													"arrivalTime": "2015-10-04T08:46:15",
													"duration": 164.25,
													"distance": 203.39000000000001,
													"path": {
															"points": "sghhHkkwx@Zly@pCjNzKvUzCtPhEdq@g@bg@iU`~@}O~c@}HtKsb@zh@aLxX_A|UhCpb@_Aha@cJ`a@yHvPmJx[uArSbAvw@uJzzA{A`r@wDz^_R~t@ye@xsBqUlsAcFxq@}K`d@mJ`MkMhG}KvAu]|Jsd@zXuoAj_A}U`^cKtPs_@~WkWzQuQ~Usa@h_A_LhQsEbTwCdSyEfn@rF`]fg@vjA`Ypr@nRfT~PrO_QsOkPiRcSub@wPoJaV{@gJnF{HnTsOvh@up@jwAsNlGaKkAeKwGoIeFeIm@gJtCyVjQuY~LoRgFyViYwIwLiEqCwQ_Ckm@|\\oN~H}UzS}Tza@iTjh@wIzYgKlq@uTzkA__@jmAg_@tgAw^``Bq]bhCsUhvA{\\zoAscAxjCi_@fu@qq@`tAkeCr`F{{@zzA_G|WYfU~L`_AJnuGdA|iC`Hj^jNzvAsCtUwGtLoOlQaQb[o|@v~Bwp@hfB_Ix\\kGpKeOtIiH`@qTmC{If@mKlIgErL_BvPvAnXhGxa@pGlPfTxVpFrY_CzYeDbKyHpJcWrHoJ~KuZpv@kXxl@wSpRgShIcSpMgNjEce@|\\aFdN{Dt[sIhPaQrGwd@nHwIdGaEfLaA~L|DhqAa@rOyCtKeFfKiJrIa_@dIeVvQgs@hm@_MfI}OCiWgOuVj@ku@hn@me@xTa\\fCmf@m@yThAqNxG}h@bu@eU|_@yDfUfAt_@eBhXiUh_@gV|sAmBjXrAjVjEpKlNtGlGfReEvUoHvDeHsAiXiW}q@c]wtE{oDyeAwy@_o@ec@alBk]sqBy[csFiv@ctCq`@g~@}Wm_@cIoiAmBk~BsCkw@gAioFih@qm@mG}FqC_TgY}FsGqKkEmRjBsUnScVbk@cObt@aJ`o@{Blh@yH`f@kSpv@qm@jyBqmBvaHiwBjqHsy@zeDwPlm@wRnb@kl@~{AaEdb@mC|JqI`LcOnEwXpCyQyAg]yJ_SyL}[u_@_Vi_@kn@i_AeXyP_[iC{sAt@gdFfBuj@\\qf@x@s{@xUiy@tWyaDraAeiDvdAsuBho@eLi@kKkI_Xwa@yPmUsxDyxDc`Akc@s^oNuRu@c_Chc@apAz}@}]|R{dCzZaWCyIoBgn@g^se@qZuk@{^ez@eg@aQgFmqA{@m{DyCqaEwEwY{DkWkPma@oh@qkGukIyKgNuWiQiEeCqnAiv@}eDsrBwnCecBkSeFeJJgQnFoNvNqJbUeErXwDlhBfCfg@jCnXdDy@xAfIr@zC|Ci@k@gMm@}D"
													},
													"isMajor": 1,
													"type": 8,
													"price": {
															"amount": 60,
															"currency": "eur"
													},
													"alternatives": [
															{
																	"departureTime": "2015-10-04T06:02:00",
																	"arrivalTime": "2015-10-04T08:46:15",
																	"duration": 164.25,
																	"price": {
																			"amount": 60,
																			"currency": "eur"
																	},
																	"pricingOptions": [],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T05:12:00",
																	"arrivalTime": "2015-10-04T09:42:00",
																	"duration": 270,
																	"price": {
																			"amount": 60,
																			"currency": "eur"
																	},
																	"pricingOptions": [],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T05:12:00",
																	"arrivalTime": "2015-10-04T08:57:00",
																	"duration": 225,
																	"price": {
																			"amount": 60,
																			"currency": "eur"
																	},
																	"pricingOptions": [],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T05:12:00",
																	"arrivalTime": "2015-10-04T08:14:15",
																	"duration": 182.25,
																	"price": {
																			"amount": 60,
																			"currency": "eur"
																	},
																	"pricingOptions": [],
																	"information": "trip.segments.multiple"
															}
													]
											}
									]
							]
					},
					{
							"isMajor": 1,
							"alternatives": [
									[
											{
													"start": {
															"description": "Frankfurt",
															"location": {
																	"latitude": 50.05143,
																	"longitude": 8.5714
															},
															"timeZone": "Europe/Berlin",
															"code": "FRA"
													},
													"end": {
															"description": "Hannover",
															"location": {
																	"latitude": 52.45859,
																	"longitude": 9.69459
															},
															"timeZone": "Europe/Berlin",
															"code": "HAJ"
													},
													"departureTime": "2015-10-04T08:55:00",
													"arrivalTime": "2015-10-04T09:45:00",
													"duration": 50,
													"distance": 278.82,
													"path": "",
													"isMajor": 1,
													"type": 16,
													"bookingLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fluft%2f1%2f11616.12067.2015-10-04%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d185.18%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-23T13%3a05%3a01",
													"price": {
															"amount": 185.18,
															"currency": "EUR"
													},
													"details": {
															"carriers": [
																	{
																			"code": "LH",
																			"name": "Lufthansa",
																			"imageUrl": "http://s1.apideeplink.com/images/airlines/LH.png",
																			"displayCode": "LH"
																	}
															],
															"operatingCarriers": [
																	{
																			"code": "LH",
																			"name": "Lufthansa",
																			"imageUrl": "http://s1.apideeplink.com/images/airlines/LH.png",
																			"displayCode": "LH"
																	}
															],
															"flightNumbers": [
																	{
																			"flightNumber": "50",
																			"carrier": {
																					"code": "LH",
																					"name": "Lufthansa",
																					"imageUrl": "http://s1.apideeplink.com/images/airlines/LH.png",
																					"displayCode": "LH"
																			}
																	}
															]
													},
													"alternatives": [
															{
																	"departureTime": "2015-10-04T04:55:00",
																	"arrivalTime": "2015-10-04T05:45:00",
																	"duration": 50,
																	"price": {
																			"amount": 137.18,
																			"currency": "EUR"
																	},
																	"pricingOptions": [
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1152,
																					"price": {
																							"amount": 137.18,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fluft%2f1%2f11616.12067.2015-10-04%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d137.18%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-23T13%3a05%3a01"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 154.22,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ft2us%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d154.22%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d3018deecda90f69397d035c04fc3feef%26q_datetime_utc%3d2015-09-24T08%3a16%3a13"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 177.76,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2forbz%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d177.76%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d5d97aab20a0b22b17a1ce4d59536eee1%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 177.76,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fctus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d177.76%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d0b5b380dd104aef722c6ed46540a93c4%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 177.88,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ftram%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d177.88%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3df0e1dfd43f04748b6f489f3555b63c0e%26q_datetime_utc%3d2015-09-24T08%3a16%3a04"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 177.88,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fpcln%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d177.88%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d472fe72b9a066ecdc082c9a340df1701%26q_datetime_utc%3d2015-09-24T08%3a16%3a02"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 179.37,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fbfus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d179.37%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d717265dbcf347e6ad4755c7459f55d1f%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 181.87,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fffus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d181.87%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3ddb8ffb2b709dc444438c4e6f6c02415b%26q_datetime_utc%3d2015-09-24T08%3a16%3a01"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 181.87,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ffnus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d181.87%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d27553803ca6a5eca4ec60389606189cc%26q_datetime_utc%3d2015-09-24T08%3a16%3a05"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 188.04,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fedus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d188.04%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d09dd80ad918afb10e67328cd2acc46c3%26q_datetime_utc%3d2015-09-24T08%3a16%3a05"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 215.07,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fmkus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c46%7c11616%7c2015-10-04T06%3a55%7c12067%7c2015-10-04T07%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d215.07%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			}
																	],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T07:50:00",
																	"arrivalTime": "2015-10-04T08:40:00",
																	"duration": 50,
																	"price": {
																			"amount": 185.18,
																			"currency": "EUR",
																			"estimate": false
																	},
																	"pricingOptions": [
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1152,
																					"price": {
																							"amount": 185.18,
																							"currency": "EUR",
																							"estimate": false
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fluft%2f1%2f11616.12067.2015-10-04%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d185.18%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-23T13%3a05%3a01"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 199.17,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ft2us%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d199.17%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d0f5f93b3ba149e38548894552415f2b7%26q_datetime_utc%3d2015-09-24T08%3a16%3a13"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 201.48,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2forbz%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d201.48%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dbefb112a0a918a3e5e4aaeb820209022%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 201.48,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fctus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d201.48%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3ddf1c5b1f26be5501df7a0f1b1976c922%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 201.54,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ftram%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d201.54%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dc3a78548a6ed2cd84daf68746bbfac32%26q_datetime_utc%3d2015-09-24T08%3a16%3a04"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 201.54,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fpcln%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d201.54%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dcd826e00584fe120506f977fc21488fd%26q_datetime_utc%3d2015-09-24T08%3a16%3a02"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 206.1,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ffnus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d206.10%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d531740bc776b1dad582e073b451fa3d0%26q_datetime_utc%3d2015-09-24T08%3a16%3a05"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 207.49,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fbfus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d207.49%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d3e255f244857b3d85dd8e069c6d139f4%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 212.65,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fedus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d212.65%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d6ab5a22def52391b735282ad6efdf790%26q_datetime_utc%3d2015-09-24T08%3a16%3a05"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 238.37,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fmkus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c50%7c11616%7c2015-10-04T09%3a50%7c12067%7c2015-10-04T10%3a40%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d238.37%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			}
																	],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T07:15:00",
																	"arrivalTime": "2015-10-04T10:10:00",
																	"duration": 175,
																	"price": {
																			"amount": 203.84,
																			"currency": "EUR"
																	},
																	"pricingOptions": [
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1152,
																					"price": {
																							"amount": 203.84,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fluft%2f1%2f11616.12067.2015-10-04%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d203.84%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-23T13%3a05%3a01"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 235.16,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2forbz%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d235.16%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d61b5a5f71248a87f14cf3600943f0e02%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 235.16,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fctus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d235.16%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d7a2e8406b1706515145c3fb3798e4b33%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 235.57,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ft2us%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d235.57%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dcc92af6f7f63daddc141dde4b3f531cd%26q_datetime_utc%3d2015-09-24T08%3a16%3a13"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 238.46,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ftram%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d238.46%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dffbb5961a2b617245a7b2c358d7cc9ff%26q_datetime_utc%3d2015-09-24T08%3a16%3a04"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 242.96,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fffus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d242.96%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d8c64a36e17ee8bda3ae5285b6c2ad013%26q_datetime_utc%3d2015-09-24T08%3a16%3a01"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 242.96,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ffnus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d242.96%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d42668ffdb353278c32dcab5bc5cea58b%26q_datetime_utc%3d2015-09-24T08%3a16%3a05"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 247.19,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fedus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d247.19%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dc11914ef1e4fc3e95a3906d48f088471%26q_datetime_utc%3d2015-09-24T08%3a16%3a05"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 272.42,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fmkus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d272.42%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 320.74,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fatus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d320.74%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d71a32dae18e078b11780ce7a69f204d2%26q_datetime_utc%3d2015-09-24T08%3a16%3a02"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 419.21,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fbfus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c98%7c11616%7c2015-10-04T09%3a15%7c14385%7c2015-10-04T10%3a10%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d419.21%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d48cacef9787d980b1427271582dd5c79%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			}
																	],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T06:55:00",
																	"arrivalTime": "2015-10-04T07:45:00",
																	"duration": 50,
																	"price": {
																			"amount": 233.18,
																			"currency": "EUR"
																	},
																	"pricingOptions": [
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1152,
																					"price": {
																							"amount": 233.18,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fluft%2f1%2f11616.12067.2015-10-04%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d233.18%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-23T13%3a05%3a01"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 246.7,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ft2us%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d246.70%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3da0aef18118bbc01a0186a965f4c92f39%26q_datetime_utc%3d2015-09-24T08%3a16%3a13"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 249.65,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2forbz%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d249.65%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d7ef40da6b3956db524d79be8881723ae%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 249.65,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fctus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d249.65%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dd50a500645e0331e45dc4d55900f42bd%26q_datetime_utc%3d2015-09-24T08%3a16%3a00"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 249.75,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ftram%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d249.75%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d6d28e25adc4ea5c36a58ec346463bf06%26q_datetime_utc%3d2015-09-24T08%3a16%3a04"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 249.75,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fpcln%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d249.75%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d43f67fcccd61c93440ab95b4b6c2ced9%26q_datetime_utc%3d2015-09-24T08%3a16%3a02"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 256.93,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fbfus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d256.93%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d516603797a1670b78d82e8ed7c739438%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 261.9,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fedus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d261.90%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3d7f959b96160a98de47c2d55f667eb03d%26q_datetime_utc%3d2015-09-24T08%3a16%3a05"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 286.76,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fmkus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c48%7c11616%7c2015-10-04T08%3a55%7c12067%7c2015-10-04T09%3a45%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d286.76%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			}
																	],
																	"information": "trip.segments.multiple"
															},
															{
																	"departureTime": "2015-10-04T05:05:00",
																	"arrivalTime": "2015-10-04T10:10:00",
																	"duration": 305,
																	"price": {
																			"amount": 312.21,
																			"currency": "EUR"
																	},
																	"pricingOptions": [
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 312.21,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2ftram%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c140%7c11616%7c2015-10-04T07%3a05%7c14827%7c2015-10-04T07%3a45%3bflight%7c-32090%7c2157%7c14827%7c2015-10-04T09%3a45%7c14385%7c2015-10-04T10%3a25%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d312.21%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3df7caeba0e64f830f8ec67ccf16878849%26q_datetime_utc%3d2015-09-24T08%3a16%3a04"
																			},
																			{
																					"agents": [
																							{}
																					],
																					"quoteAgeInMinutes": 1,
																					"price": {
																							"amount": 312.73,
																							"currency": "EUR"
																					},
																					"deeplinkUrl": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fEUR%2fbfus%2f1%2f11616.12067.2015-10-04%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c140%7c11616%7c2015-10-04T07%3a05%7c14827%7c2015-10-04T07%3a45%3bflight%7c-32090%7c2157%7c14827%7c2015-10-04T09%3a45%7c14385%7c2015-10-04T10%3a25%3bflight%7c-32090%7c2094%7c14385%7c2015-10-04T11%3a05%7c12067%7c2015-10-04T12%3a10%26carriers%3d-32090%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d312.73%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3dc6ec152b-87fe-4d5e-a576-16354af4462b%26deeplink_ids%3dc09ff4abe2b2f2ef774c23e5043a26ca%26q_datetime_utc%3d2015-09-24T08%3a16%3a03"
																			}
																	],
																	"information": "trip.segments.multiple"
															}
													]
											}
									]
							]
					},
					{
							"isMajor": 0,
							"alternatives": [
									[
											{
													"start": {
															"description": "Hannover",
															"location": {
																	"latitude": 52.45859,
																	"longitude": 9.69459
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Oldenburger Allee",
															"location": {
																	"latitude": 52.41711,
																	"longitude": 9.82973
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 52,
													"distance": 30.29,
													"path": "y`p~Hq{iz@sb@cBaY|D_b@io@yQei@{n@gi@{`@cTu_@q\\_V{i@gPke@km@ihDid@okB[qv@a^ui@iRi`@s}d_Icuez@zr@czEzfGvvGf}AmhDleFy_IdYhaH",
													"isMajor": 0,
													"type": 8,
													"price": {
															"amount": 3,
															"currency": "eur"
													}
											},
											{
													"start": {
															"description": "Oldenburger Allee",
															"location": {
																	"latitude": 52.41711,
																	"longitude": 9.82973
															},
															"timeZone": "Europe/Berlin"
													},
													"end": {
															"description": "Destination",
															"location": {
																	"latitude": 52.41754,
																	"longitude": 9.82674
															},
															"timeZone": "Europe/Berlin"
													},
													"departureTime": "",
													"arrivalTime": "",
													"duration": 4,
													"distance": 0.32,
													"path": "}u|~Hyz~z@rCfGHp@s@x@_DvA_@hC",
													"isMajor": 0,
													"type": 1,
													"price": {
															"amount": 0,
															"currency": "eur"
													}
											}
									]
							]
					}
			]
		}
  ]);