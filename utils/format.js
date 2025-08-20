exports.formatUserSelections = (selections) => {
    return selections.map(selection => {
        const timeSlot = selection.time_slot;
        const session = timeSlot?.session;
        const stage = session?.stage;
        const campaign = stage?.campaign;

        return {
            id: selection.id,
            user_id: selection.user_id,
            campaign:{
                id: campaign?.id,
                title: campaign?.title,
                description: campaign?.description,
                start_date: campaign?.start_date,
                end_date: campaign?.end_date,
                is_active: campaign?.is_active,
                stage: {
                    id: stage?.id,
                    title: stage?.title,
                    description: stage?.description,
                    campaign_id: stage?.campaign_id,
                    session: {
                        id: session?.id,
                        title: session?.title,
                        start_time: session?.start_time,
                        end_time: session?.end_time,
                        location: session?.location,
                        time_slot: {
                            id: timeSlot?.id,
                            start_time: timeSlot?.start_time,
                            end_time: timeSlot?.end_time,
                            max_seats: timeSlot?.max_seats,
                            booked_seats: timeSlot?.booked_seats,
                            is_available: timeSlot?.is_available
                        }
                    }
                }
            },
            selection_status: selection.selection_status,
            createdAt: selection.createdAt,
            updatedAt: selection.updatedAt
        };
    });
};