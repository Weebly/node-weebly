let base = {
    manifest: 1,
    client_id: null,
    version: null,
    manage_app_url: null,
    scopes: [],
    callback_url: null,
    oauth_final_destination: null,
    webhooks: {
        callback_url: null,
        events: []
    },
    snippet: null
};

module.exports = {
    build(
        initialAnswers,
        settingsAnswers,
        externalSettings,
        tutorialAnswers,
        dashboardCardAnswers
    ) {
        //
    }
}